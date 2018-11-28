'use strict';

import * as fs from 'fs';
import * as path from 'path';
import * as mime from 'mime';
import { logError } from './util';
import { getUberEstimate } from './func';
import { IRequestData } from '../client/func';
import { IncomingMessage, ServerResponse, createServer } from 'http';
import { sendErrorRestResponse, sendSuccessRestResponse } from './response';

const SERVER_PORT = process.env.SERVER_PORT || process.env.PORT || 80;
const SERVER_URL = process.env.SERVER_URL || `http://localhost:${SERVER_PORT}`;
const UBERAPI_SERVER_TOKEN = process.env.UBERAPI_SERVER_TOKEN || '';
const server = createServer();

server.on('request', (req: IncomingMessage, res: ServerResponse): void => {
  switch (req.url) {
    case '/estimate':
      const body: Buffer[] = [];
      req.on('data', (chunk: Buffer) => {
        body.push(chunk);
      }).on('end', () => {
        if (body.length < 1) {
          logError(new Error('Body is empty!'));
          sendErrorRestResponse(res, 'Body is empty!', 400);
          return;
        }
        const data: IRequestData = JSON.parse(body.toString());
        getUberEstimate(data, UBERAPI_SERVER_TOKEN)
          .then((resData: {}) => {
            sendSuccessRestResponse(res, resData);
          })
          .catch((errStr: string) => {
            logError(new Error(errStr));
            sendErrorRestResponse(res, 'Some server problems happened!');
          });
      });
      req.on('error', (err: Error) => {
        logError(err);
        sendErrorRestResponse(res, err.message, 400);
      });
      break;

    case '/':
      res.setHeader('Content-Type', 'text/html');
      const html: string =
        fs.readFileSync(path.normalize(process.env.PWD + '/index.html'), 'utf-8').toString();
      res.end(html);
      break;

    default:
      try {
        const file: Buffer =
          fs.readFileSync(`${path.normalize(`${ process.env.PWD }${ req.url }`)}`);
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
      break;
  }

}).listen(SERVER_PORT, () => {
  console.log(`Server is running on ${ SERVER_URL } ${new Date()}`);
});
