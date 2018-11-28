'use strict';

import { getCurrentTranslations } from '../both/translations';
import { getLastArrayIndex } from '../both/utils';
import { SYMBOLS_VALUES } from '../both/constants';

export const calcExpressionParts = (expressionParts: string[]): number => {
  const reversePolishNotationArr: string[] = makeReversePolishNotationArr(expressionParts);
  return calcReversePolishNotationArr(reversePolishNotationArr);
};

const calcReversePolishNotationArr = (reversePolishNotationArr: string[]): number => {
  const resultArr: number[] = [];
  reversePolishNotationArr.forEach((part: string) => {
    const index: number = getLastArrayIndex(resultArr);
    if (/[0-9]+/.test(part)) {
      resultArr.push(parseFloat(part));
    } else if (
      'undefined' === typeof resultArr[index] ||
      'undefined' === typeof resultArr[index - 1]
    ) {
      throw new Error(getCurrentTranslations()['Bad Expression!']);
    } else if (part === SYMBOLS_VALUES.power) {
      resultArr[index - 1] = Math.pow(resultArr[index - 1], resultArr[index]);
      resultArr.pop();
    } else if (part === SYMBOLS_VALUES.summation) {
      resultArr[index - 1] = resultArr[index - 1] + resultArr[index];
      resultArr.pop();
    } else if (part === SYMBOLS_VALUES.subtraction) {
      resultArr[index - 1] = resultArr[index - 1] - resultArr[index];
      resultArr.pop();
    } else if (part === SYMBOLS_VALUES.multiplication) {
      resultArr[index - 1] = resultArr[index - 1] * resultArr[index];
      resultArr.pop();
    } else if (part === SYMBOLS_VALUES.division) {
      resultArr[index - 1] = resultArr[index - 1] / resultArr[index];
      resultArr.pop();
    } else {
      throw new Error(getCurrentTranslations()['Bad Expression!']);
    }
  });
  return resultArr.length > 0 ? resultArr[0] : 0;
};

const getSymbolPriority = (symbol: string): number => {
  if (!symbol) {
    return 0;
  }
  if (symbol === SYMBOLS_VALUES.power) {
    return 4;
  }
  if (
    symbol === SYMBOLS_VALUES.multiplication ||
    symbol === SYMBOLS_VALUES.division
  ) {
    return 3;
  }
  if (
    symbol === SYMBOLS_VALUES.summation ||
    symbol === SYMBOLS_VALUES.subtraction
  ) {
    return 2;
  }
  if (
    symbol === SYMBOLS_VALUES.open_bracket ||
    symbol === SYMBOLS_VALUES.close_bracket
  ) {
    return 1;
  }

  return 0;

};

const makeReversePolishNotationArr = (expressionParts: string[]): string[] => {
  const resultArr: string[] = [];
  const stack: string[] = [];
  let lastIndex: number;
  let priorityLastIndex: number;
  let currentPriority: number;
  let lastElement: string;

  expressionParts.forEach((part) => {
    if (/[0-9]+/.test(part)) {
      resultArr.push(part);
    } else {
      if (part === SYMBOLS_VALUES.percentages) {
        lastIndex = getLastArrayIndex(resultArr);
        const number = parseFloat(resultArr[lastIndex]);
        resultArr[lastIndex] = (number / 100).toFixed(4);
      } else if (part === SYMBOLS_VALUES.open_bracket) {
        stack.push(part);
      } else if (part === SYMBOLS_VALUES.close_bracket) {
        lastIndex = getLastArrayIndex(stack);
        while (stack[lastIndex] !== SYMBOLS_VALUES.open_bracket) {
          lastElement = stack[lastIndex];
          stack.pop();
          resultArr.push(lastElement);
          lastIndex = lastIndex - 1;
        }
        stack.pop();
      } else {
        lastIndex = getLastArrayIndex(stack);
        priorityLastIndex = getSymbolPriority(stack[lastIndex]);
        currentPriority = getSymbolPriority(part);

        if (currentPriority > priorityLastIndex) {
          stack.push(part);
        } else {
          while (currentPriority <= priorityLastIndex) {
            lastElement = stack[lastIndex];
            stack.pop();
            lastIndex = getLastArrayIndex(stack);
            priorityLastIndex = getSymbolPriority(stack[lastIndex]);
            resultArr.push(lastElement);
          }
          stack.push(part);
        }
      }
    }
  });
  while (stack.length > 0) {
    lastIndex = getLastArrayIndex(stack);
    lastElement = stack[lastIndex];
    stack.pop();
    resultArr.push(lastElement);
  }
  return resultArr;
};
