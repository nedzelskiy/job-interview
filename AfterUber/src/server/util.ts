'use strict';

export const logError = (error: Error): void => {
  console.log(error, JSON.stringify(error, null, 4));
};

export const capitalizeFirstChar = (str: string): string => {
  return str[0].toUpperCase() + str.slice(1);
};
