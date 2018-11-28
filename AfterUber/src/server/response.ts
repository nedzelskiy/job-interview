'use strict';

import { ServerResponse } from 'http';

export const sendSuccessRestResponse =
  (response: ServerResponse, res: any, status: number = 200): void => {
    response.setHeader('Content-Type', 'application/json');
    response.statusCode = status;
    response.end(JSON.stringify({
      success: true,
      result: res,
    }));
  };

export const sendErrorRestResponse =
  (response: ServerResponse, mess: string, status: number = 500): void => {
    response.setHeader('Content-Type', 'application/json');
    response.statusCode = status;
    response.end(JSON.stringify({
      success: false,
      message: mess,
    }));
  };
