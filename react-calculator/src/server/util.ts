'use strict';

export const logError = (error: Error): void => {
  console.log(error, JSON.stringify(error, null, 4));
};

