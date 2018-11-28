'use strict';

import { URL } from 'url';
import * as request from 'request';
import { capitalizeFirstChar } from './util';
import { IRequestData } from '../client/func';

export const getUberEstimate = (data: IRequestData, serverToken: string): Promise<string|any[]> => {
  const url = new URL('https://api.uber.com/v1.2/estimates/price');
  url.searchParams.append('start_latitude', data.addressFrom.lat.toString());
  url.searchParams.append('start_longitude', data.addressFrom.lng.toString());
  url.searchParams.append('end_latitude', data.addressTo.lat.toString());
  url.searchParams.append('end_longitude', data.addressTo.lng.toString());

  return new Promise((resolve, reject) => {
    request(
      {
        uri: url.href,
        headers: {
          Authorization: `Token ${serverToken}`,
          'Accept-Language': 'en_US',
          'Content-Type': 'application/json',
        },
        proxy: '',
      },
      (error, response, body) => {
        if (error) {
          reject(error.message);
          return;
        }
        const res = JSON.parse(body);
        if (res.message) {
          reject(res.message);
          return;
        }
        if (res.prices) {
          resolve(decorateResponseData(res.prices));
          return;
        }
        reject('Unknown error');
      },
    );
  });
};

const decorateResponseData = (responseData: any[]): any[] => {
  const priceRatio = 0.8;

  responseData.forEach((uberService: any, index: number) => {
    responseData[index].localized_display_name =
      `After${ capitalizeFirstChar(uberService.localized_display_name) }`;
    responseData[index].display_name =
      `After${ capitalizeFirstChar(uberService.display_name) }`;
    responseData[index].high_estimate =
      Math.round(parseFloat(uberService.high_estimate) * priceRatio);
    responseData[index].low_estimate =
      Math.round(parseFloat(uberService.low_estimate) * priceRatio);

    const currency_code = uberService.currency_code;
    const low_estimate = responseData[index].low_estimate;
    const high_estimate = responseData[index].high_estimate;

    responseData[index].estimate = `${currency_code}${low_estimate}-${high_estimate}`;
  });
  return responseData;
};
