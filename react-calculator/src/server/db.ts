'use strict';

import * as redis from 'redis';
import { logError } from './util';

const client: redis.RedisClient = redis.createClient({
  host: process.env.REDIS_HOST as string,
  port: parseInt(process.env.REDIS_PORT || '', undefined),
});

const db: any = {};

client.on('error', (err: Error) => {
  logError(err);
});

const getResultHandler =
  (resolve: Function, reject: Function, err: Error, result: string): void => {
    err && reject();
    resolve(result);
  };

db.getClient = (): redis.RedisClient => {
  return client;
};


db.getLast = (key: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    client.lindex(key, -1, getResultHandler.bind(this, resolve, reject));
  });
};

db.getFirst = (key: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    client.lindex(key, 0, getResultHandler.bind(this, resolve, reject));
  });
};

db.getAll = (key: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    client.lrange(key, 0, -1, getResultHandler.bind(this, resolve, reject));
  });
};

db.addFirst = (key: string, value:string): Promise<number> => {
  return new Promise((resolve, reject) => {
    client.lpush(key, value, getResultHandler.bind(this, resolve, reject));
  });
};

db.addLast = (key: string, value:string): Promise<number> => {
  return new Promise((resolve, reject) => {
    client.rpush(key, value, getResultHandler.bind(this, resolve, reject));
  });
};

db.shift = (key: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    client.lpop(key, getResultHandler.bind(this, resolve, reject));
  });
};

db.pop = (key: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    client.rpop(key, getResultHandler.bind(this, resolve, reject));
  });
};

db.countRows = (key: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    client.llen(key, getResultHandler.bind(this, resolve, reject));
  });
};

db.getByRowNumber = (key: string, number: number): Promise<number|null> => {
  if (number < 1) {
    return Promise.resolve(null);
  }
  const index: number = number - 1;
  return new Promise((resolve, reject) => {
    client.lindex(key, index, getResultHandler.bind(this, resolve, reject));
  });
};



export default db;
