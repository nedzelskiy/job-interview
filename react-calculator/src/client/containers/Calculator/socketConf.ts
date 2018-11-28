'use strict';

import { logError } from '../../util';
import * as io from 'socket.io-client';
import settings from '../../../both/settings';
import { throwError } from '../ErrorHandler/actions';
import { getCurrentTranslations } from '../../../both/translations';

const t = getCurrentTranslations();

export interface IMessage {
  result: string;
  success: boolean;
  message: string;
}

const socketConf: any = {
  socket: io(settings.SERVER_SOCKET_URL.toString(), {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: Infinity,
  }),
  messageHandler: (): void => {
  },
};

const closeHandler = (event: CloseEvent) => {
  let message = '';
  if (event.wasClean) {
    message = t['The connection is closed cleanly'];
  } else {
    message = t['Connection failure'];
  }
  message = `${message}
        ${t['Code']}: ${ event.code }.  ${event.reason} 
    `;
  logError(message);
  throwError(message);
};
const errorHandler: any = (error: ErrorEvent) => {
  throwError(error.message);
};

socketConf.socket.on('close', closeHandler);
socketConf.socket.on('error', errorHandler);
socketConf.socket.on('disconnect', closeHandler);


export default {
  setMessageHandler: (handler: any) => {
    socketConf.messageHandler = handler;
    socketConf.socket.on('message', handler);
  },
  getSocket: (): SocketIOClient.Socket => {
    return socketConf.socket;
  },
};
