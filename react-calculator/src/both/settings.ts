'use strict';

const settings: { [propName: string]: string|number } = {};
settings.SERVER_PORT = process.env.SERVER_PORT || process.env.PORT || 80;
settings.SERVER_SOCKET_PORT = process.env.SERVER_SOCKET_PORT || process.env.PORT || 80;
settings.SERVER_URL = `${ process.env.SERVER_URL }` || `http://localhost:${ settings.SERVER_PORT }`;
settings.SERVER_SOCKET_URL =
  `${ process.env.SERVER_SOCKET_URL }` || `http://localhost:${ settings.SERVER_SOCKET_PORT }`;


export default settings;
