'use strict';

export const getLastArrayIndex = (arr: any[]): number => {
  return arr.length - 1 > -1 ? arr.length - 1 : 0;
};
