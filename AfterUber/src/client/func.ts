'use strict';

import registr from './registr';
import { IControls } from './init';
import LatLng = google.maps.LatLng;
import Autocomplete = google.maps.places.Autocomplete;
import DirectionsStatus = google.maps.DirectionsStatus;
import DirectionsResult = google.maps.DirectionsResult;
import DirectionsRequest = google.maps.DirectionsRequest;


export const addressChangerHandler = (controls: IControls, autoComplete: Autocomplete): void => {
  controls.infoWindow.close();
  controls.marker.setVisible(false);
  const place = autoComplete.getPlace();
  if (!place.geometry) {
    registr.msgDialog.showMsgDialog(`No details available for: ${ place.name }`);
    return;
  }
  if (isFilledAllAddresses(controls)) {
    calcRoute(controls);
    return;
  }
  if (place.geometry.viewport) {
    controls.map.fitBounds(place.geometry.viewport);
  } else {
    controls.map.setCenter(place.geometry.location);
    controls.map.setZoom(17);
  }
  controls.marker.setIcon({
    url: place.icon,
    size: new google.maps.Size(71, 71),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(17, 34),
    scaledSize: new google.maps.Size(35, 35),
  });
  controls.marker.setPosition(place.geometry.location);
  controls.marker.setVisible(true);

  let address = '';
  if (place.address_components) {
    address = [
      (place.address_components[0] && place.address_components[0].short_name || ''),
      (place.address_components[1] && place.address_components[1].short_name || ''),
      (place.address_components[2] && place.address_components[2].short_name || ''),
    ].join(' ');
  }

  controls.infoWindow.setContent(`<div><strong>${ place.name }</strong><br>${ address }`);
  controls.infoWindow.open(controls.map, controls.marker);
};

export const calcRoute = (controls: IControls): void => {
  if (!isFilledAllAddresses(controls)) {
    return;
  }
  const origin: LatLng = controls.addressFrom.getPlace().geometry.location;
  const destination: LatLng = controls.addressTo.getPlace().geometry.location;
  const request: DirectionsRequest = {
    origin,
    destination,
    travelMode: google.maps.TravelMode.DRIVING,
  };
  controls.directionsService.route(
    request,
    calcRouteHandler.bind(this, controls),
  );
};

export const calcRouteHandler =
  (controls:IControls, result: DirectionsResult, status: DirectionsStatus): void => {
    if (result.routes.length < 1) {
      registr.msgDialog.showMsgDialog('No routes for specified addresses!');
      return;
    }
    if (status.toString().toUpperCase() === 'OK') {
      controls.directionsDisplay.setDirections(result);
    }
  };

export const isFilledAllAddresses = (controls: IControls): boolean => {
  return (
    !!controls.addressFrom.getPlace() &&
    !!controls.addressTo.getPlace() &&
    !!controls.addressFromHTML.value &&
    !!controls.addressToHTML.value
  );
};

export interface IRequestData {
  addressFrom: google.maps.LatLngLiteral;
  addressTo: google.maps.LatLngLiteral;
}

export const estimateHandler = (controls: IControls): void => {
  if (!isFilledAllAddresses(controls)) {
    registr.msgDialog.showMsgDialog('Please set address first!');
    return;
  }
  showPreloader();
  const data: IRequestData = {
    addressFrom: {
      lat: controls.addressFrom.getPlace().geometry.location.lat(),
      lng: controls.addressFrom.getPlace().geometry.location.lng(),
    },
    addressTo: {
      lat: controls.addressTo.getPlace().geometry.location.lat(),
      lng: controls.addressTo.getPlace().geometry.location.lng(),
    },
  };
  sendEstimateRequest(data);
};

export const sendEstimateRequest = (data: IRequestData): void => {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/estimate');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = responseEstimateHandler;
  xhr.send(JSON.stringify(data));
};

export const responseEstimateHandler = function (): void {
  hidePreloader();
  try {
    const response = JSON.parse(this.responseText);
    if (this.status === 200 && response.success && response.result) {
      renderResultWindow(response.result);
    } else if (!response.success && response.message) {
      registr.msgDialog.showMsgDialog(response.messag);
    } else {
      registr.msgDialog.showMsgDialog('Something went wrong!');
    }
  } catch (err) {
    registr.msgDialog.showMsgDialog('Received bad data!');
  }
};

export const renderResultWindowContent = (data: any[]): string => {
  let html: string = '';
  data.forEach((uberService: any) => {
    html = html +
      `<span>${ uberService.display_name }: </span>
      <strong>
        ${uberService.low_estimate} - ${uberService.high_estimate}
      </strong>
      <span>     
        ${uberService.currency_code}
      </span>
      <br />
      `;
  });
  return html;
};

export const renderResultWindow = (data: any[]): void => {
  if (data.length < 1) {
    registr.msgDialog.showMsgDialog('No available cars for specified addresses!');
    return;
  }
  const marker = registr.controls.marker;
  const map = registr.controls.map;
  const infoWindow = registr.controls.infoWindow;
  const directionsDisplay = registr.controls.directionsDisplay;
  const overviewPath = directionsDisplay.getDirections().routes[0].overview_path;
  const centerIndex: number = Math.round((overviewPath.length - 1) / 2);
  const centerPath: number = centerIndex < 0 ? 0 : centerIndex;

  marker.setPosition(overviewPath[centerPath]);
  infoWindow.setContent(renderResultWindowContent(data));
  infoWindow.open(map, marker);
};

export const showPreloader = (): void => {
  registr.overloadHTML.classList.remove('hidden');
};

export const hidePreloader = (): void => {
  registr.overloadHTML.classList.add('hidden');
};
