'use strict';

import { ServerResponse } from 'http';

export const sendSuccessWebSocketResponse = (socket: WebSocket, res: string): void => {
  socket.send(JSON.stringify({
    success: true,
    result: res,
  }));
};

export const sendErrorWebSocketResponse = (socket: WebSocket, mess: string): void => {
  socket.send(JSON.stringify({
    success: false,
    message: mess,
  }));
};

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
