'use strict';

import * as fs from 'fs';
import * as ejs from 'ejs';
import * as path from 'path';
import * as mime from 'mime';
import { graphql } from 'graphql';
import { logError } from './util';
import * as socket from 'socket.io';
import settings from '../both/settings';
import { schema, options as graphQLOptions, addResult } from './graphql';
import { getCurrentTranslations, getLanguage } from '../both/translations';
import {
  sendErrorWebSocketResponse, sendSuccessWebSocketResponse,
  sendSuccessRestResponse, sendErrorRestResponse } from './response';

import { calcExpressionParts } from './logic';
import { IncomingMessage, ServerResponse, createServer } from 'http';

const t = getCurrentTranslations;
const server = createServer();

graphQLOptions.resultTable = 'calculator';
graphQLOptions.maxRowsInResultTable = 5;

server.on('request', (req: IncomingMessage, res: ServerResponse): void => {
  res.statusCode = 200;
  if ('/' !== req.url && '/graphql' !== req.url) {
    try {
      const file: Buffer = fs.readFileSync(`${path.normalize(`${ process.env.PWD }${ req.url }`)}`);
      const mimeType: string | null =
        mime.getType(`${path.normalize(`${ process.env.PWD }${ req.url }`)}`);
      if (mimeType) {
        res.setHeader('Content-Type', mimeType);
      }
      res.end(file);
    } catch (err) {
      res.statusCode = 404;
      res.end('Not found!');
    }
    return;
  }
  if ('/graphql' === req.url && req.method === 'POST') {
    const body: Buffer[] = [];

    req.on('data', (chunk: Buffer) => {
      body.push(chunk);
    }).on('end', () => {
      graphql(schema, Buffer.concat(body).toString()).then((response) => {
        if (response.errors) {
          logError(response.errors[0]);
          sendErrorRestResponse(res, t()['Server error!']);
          return;
        }
        res.end(sendSuccessRestResponse(res, response.data));
      });
    });
    return;
  }
  res.setHeader('Content-Type', 'text/html');
  const html: string =
    ejs.render(
      fs.readFileSync(path.normalize(process.env.PWD + '/index.ejs'), 'utf-8').toString(), {
        lang: getLanguage(req.headers['accept-language']),
      },
    );
  res.end(html);
}).listen(settings.SERVER_PORT, () => {
  console.log(`Server is running on ${ settings.SERVER_PORT } ${new Date()}`);
});

socket(server).on('connection', (ws: WebSocket & NodeJS.EventEmitter) => {
  ws.on('message', (message: string) => {
    messageHandler(ws, message);
  });
  ws.on('close', () => {});
  ws.on('error', () => {});
});

const messageHandler = function (socket: WebSocket, message: string): void {
  try {
    const expressionParts: string[] = JSON.parse(message);
    if (expressionParts.length < 1) {
      sendSuccessWebSocketResponse(socket, '0');
      return;
    }
    const result: number = calcExpressionParts(expressionParts);
    if (!isFinite(result)) {
      throw new Error(t()['Bad Expression or too long numbers']);
    }
    addResult(result);
    sendSuccessWebSocketResponse(socket, result.toString());
  } catch (err) {
    sendErrorWebSocketResponse(socket, err.message);
  }
};
