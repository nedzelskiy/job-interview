'use strict';

export interface IControls {
  readonly map: google.maps.Map;
  readonly marker: google.maps.Marker;
  readonly addressToHTML: HTMLInputElement;
  readonly addressFromHTML: HTMLInputElement;
  readonly infoWindow: google.maps.InfoWindow;
  readonly addressTo: google.maps.places.Autocomplete;
  readonly addressFrom: google.maps.places.Autocomplete;
  readonly directionsService: google.maps.DirectionsService;
  readonly directionsDisplay: google.maps.DirectionsRenderer;
}

export const initMap =
  (
    mapHTML:HTMLElement,
    addressFromHTML: HTMLInputElement,
    addressToHTML: HTMLInputElement,
    startLat: number,
    startLng: number,
  ): IControls => {
    const map = new google.maps.Map(mapHTML, {
      center: {
        lat: startLat,
        lng: startLng,
      },
      zoom: 13,
      mapTypeControlOptions: {
        position: google.maps.ControlPosition.BOTTOM_LEFT,
      },
    });

    const marker = new google.maps.Marker({
      map,
      anchorPoint: new google.maps.Point(0, -29),
      position: {
        lat: startLat,
        lng: startLng,
      },
    });
    marker.setVisible(false);

    const initMap: IControls = {
      map,
      marker,
      addressFromHTML,
      addressToHTML,
      infoWindow: new google.maps.InfoWindow(),
      directionsService: new google.maps.DirectionsService(),
      directionsDisplay: new google.maps.DirectionsRenderer(),
      addressTo: new google.maps.places.Autocomplete(addressToHTML),
      addressFrom: new google.maps.places.Autocomplete(addressFromHTML),
    };

    initMap.directionsDisplay.setMap(initMap.map);
    initMap.addressTo.bindTo('bounds', initMap.map);
    initMap.addressFrom.bindTo('bounds', initMap.map);

    return initMap;
  };

