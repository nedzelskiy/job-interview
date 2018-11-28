'use strict';

import store from '../../store';
import { getLastArrayIndex } from '../../../both/utils';
import { SYMBOLS_VALUES } from '../../../both/constants';

export const getExpressionParts = () => {
  const state: any = store.getState();
  return JSON.parse(JSON.stringify(state.Calculator.expressionParts));
};

export const addOpenBracket = (symbol: string): string[] => {
  const expressionParts: string[] = getExpressionParts();
  const lastIndex: number = getLastArrayIndex(expressionParts);
  const isLastPartOperand: boolean = checkIsPartOperand(expressionParts, lastIndex);
  const isLastPartCloseBracket: boolean = checkIsPartCloseBracket(expressionParts, lastIndex);
  const isLastPartPercentages: boolean = checkIsPartPercentages(expressionParts, lastIndex);

  if (isLastPartOperand || isLastPartCloseBracket || isLastPartPercentages) {
    // add default operation between brackets - multiplication
    expressionParts[lastIndex] = getOperandReady(expressionParts[lastIndex]);
    expressionParts.push(SYMBOLS_VALUES.multiplication);
  }
  expressionParts.push(symbol);
  return expressionParts;
};


export const addCloseBracket = (symbol: string): string[] => {
  const expressionParts: string[] = getExpressionParts();
  const lastIndex: number = getLastArrayIndex(expressionParts);
  const isLastPartOperand: boolean = checkIsPartOperand(expressionParts, lastIndex);
  const isLastPartCloseBracket: boolean = checkIsPartCloseBracket(expressionParts, lastIndex);

  if (isLastPartOperand) {
    expressionParts[lastIndex] = getOperandReady(expressionParts[lastIndex]);
  }
  if (isLastPartOperand || isLastPartCloseBracket) {
    expressionParts.push(symbol);
  }
  return expressionParts;
};

export const changeSign = (): string[] => {
  const expressionParts: string[] = getExpressionParts();
  const lastIndex: number = getCurrentOperandIndex(expressionParts);
  const isLastPartOperand: boolean = checkIsPartOperand(expressionParts, lastIndex);

  if (isLastPartOperand) {
    const operand = expressionParts[lastIndex];
    const isOperandHasSignMinus: boolean = checkIsOperandHasSingMinus(operand);

    if (!isOperandHasSignMinus) {
      expressionParts[lastIndex] = `${ SYMBOLS_VALUES.sign_minus }${ operand }`;
    } else {
      expressionParts[lastIndex] = operand.slice(1);
    }
  }
  return expressionParts;
};


export const addOperandSymbol = (symbol: string): string[] => {
  const expressionParts: string[] = getExpressionParts();
  const lastArrayIndex: number = getLastArrayIndex(expressionParts);
  const lastIndex: number = getCurrentOperandIndex(expressionParts);
  const isLastPartPercentages: boolean = checkIsPartPercentages(expressionParts, lastArrayIndex);

  if (isLastPartPercentages) {
    return expressionParts;
  }
  if (!expressionParts[lastIndex]) {
    expressionParts[lastIndex] = '';
  }
  if (symbol === SYMBOLS_VALUES.dot) {
    const isOperandAlreadyContainsDot: boolean =
      checkIsOperandContainDot(expressionParts[lastIndex]);
    if (isOperandAlreadyContainsDot) {
      return expressionParts;
    }
    const isThisSymbolFirst: boolean = expressionParts[lastIndex].length < 1;
    if (isThisSymbolFirst) {
      // add 0 before .
      expressionParts[lastIndex] = '0';
    }
  } else if (symbol === '0') {
    const isOperandAlreadyContainsDot: boolean =
      checkIsOperandContainDot(expressionParts[lastIndex]);
    const isOperandContainsOnlyZero: boolean =
      checkIsOperandContainsOnlyZero(expressionParts, lastIndex);

    if (!isOperandAlreadyContainsDot && isOperandContainsOnlyZero) {
      return expressionParts;
    }
  } else {
    const isOperandAlreadyContainsDot: boolean =
      checkIsOperandContainDot(expressionParts[lastIndex]);
    const isOperandContainsOnlyZero: boolean =
      checkIsOperandContainsOnlyZero(expressionParts, lastIndex);

    if (!isOperandAlreadyContainsDot && isOperandContainsOnlyZero) {
      expressionParts[lastIndex] =
        expressionParts[lastIndex].slice(0, expressionParts[lastIndex].length - 2);
    }
  }
  expressionParts[lastIndex] = `${ expressionParts[lastIndex] }${ symbol }`;

  const isPreviousPartWasClosedBracket: boolean =
    checkIsPartCloseBracket(expressionParts, lastIndex - 1);
  if (isPreviousPartWasClosedBracket) {
    // add default operation between brackets - multiplication
    expressionParts[lastIndex + 1] = expressionParts[lastIndex];
    expressionParts[lastIndex] = SYMBOLS_VALUES.multiplication;
  }
  return expressionParts;
};

export const addOperationSymbol = (symbol: string): string[] => {
  const expressionParts: string[] = getExpressionParts();
  const lastIndex: number = getLastArrayIndex(expressionParts);
  const isThisSymbolFirstInExpression: boolean = checkIsExpressionEmpty(expressionParts, lastIndex);

  if (isThisSymbolFirstInExpression) {
    return expressionParts;
  }
  const isPreviousPartOpenBrackets: boolean = checkIsPartOpenBracket(expressionParts, lastIndex);

  if (isPreviousPartOpenBrackets) {
    return expressionParts;
  }

  const isPreviousPartOperand: boolean = checkIsPartOperand(expressionParts, lastIndex);
  const isPreviousPartCloseBracket: boolean = checkIsPartCloseBracket(expressionParts, lastIndex);
  const isPreviousPartPercentages: boolean = checkIsPartPercentages(expressionParts, lastIndex);

  if (isPreviousPartOperand) {
    expressionParts[lastIndex] = getOperandReady(expressionParts[lastIndex]);
    expressionParts.push(symbol);
  } else if (isPreviousPartCloseBracket || isPreviousPartPercentages) {
    expressionParts.push(symbol);
  } else {
    // replace previous operand
    expressionParts[lastIndex] = symbol;
  }

  return expressionParts;
};

export const addPercentages = (symbol: string): string[] => {
  const expressionParts: string[] = getExpressionParts();
  const lastIndex: number = getLastArrayIndex(expressionParts);
  const isLastPartOperand: boolean = checkIsPartOperand(expressionParts, lastIndex);
  const isLastPartCloseBracket: boolean = checkIsPartCloseBracket(expressionParts, lastIndex);
  const isLastPartOpenBracket: boolean = checkIsPartOpenBracket(expressionParts, lastIndex);

  if (isLastPartCloseBracket || isLastPartOpenBracket) {
    return expressionParts;
  }

  if (isLastPartOperand) {
    expressionParts[lastIndex] = getOperandReady(expressionParts[lastIndex]);
    expressionParts.push(symbol);
  }

  return expressionParts;
};

export const deleteSymbol = (): string[] => {
  const expressionParts: string[] = getExpressionParts();
  const lastIndex: number = getLastArrayIndex(expressionParts);
  const isLastPartOperand = checkIsPartOperand(expressionParts, lastIndex);

  if (!isLastPartOperand) {
    expressionParts.pop();
    return expressionParts;
  }

  expressionParts[lastIndex] =
    expressionParts[lastIndex].slice(0, expressionParts[lastIndex].length - 1);

  const isOperandEmpty = expressionParts[lastIndex] === '';
  if (isOperandEmpty) {
    expressionParts.pop();
  }

  return expressionParts;
};

export const getCurrentOperandIndex = (expressionParts: string[]): number => {
  let lastIndex: number = getLastArrayIndex(expressionParts);
  const isExistExpressionPartByIndex: boolean = !!expressionParts[lastIndex];
  const isThisPartOperand: boolean = checkIsPartOperand(expressionParts, lastIndex);

  if (isExistExpressionPartByIndex && !isThisPartOperand) {
    lastIndex = lastIndex + 1;
  }
  return lastIndex;
};

export const getOperandReady = (operand: string): string => {
  const isOperandLastSymbolWasDot: boolean = checkIsLastOperandSymbolDot(operand);
  if (isOperandLastSymbolWasDot) {
    // remove .
    return operand.slice(0, operand.length - 1);
  }
  return operand;
};

const checkIsPartOperand = (expressionParts: string[], index: number): boolean => {
  return /[0-9]+/.test(expressionParts[index]);
};

const checkIsPartCloseBracket = (expressionParts: string[], index: number): boolean => {
  return expressionParts[index] === SYMBOLS_VALUES.close_bracket;
};

const checkIsPartPercentages = (expressionParts: string[], index: number): boolean => {
  return expressionParts[index] === SYMBOLS_VALUES.percentages;
};

const checkIsOperandContainDot = (operand: string): boolean => {
  return !!~operand.indexOf(SYMBOLS_VALUES.dot);
};

const checkIsOperandContainsOnlyZero = (expressionParts: string[], index: number): boolean => {
  return !/[1-9]+/.test(expressionParts[index]);
};

const checkIsOperandHasSingMinus = (operand: string): boolean => {
  const firstOperandChar = operand[0];
  return firstOperandChar === SYMBOLS_VALUES.sign_minus;
};

const checkIsPartOpenBracket = (expressionParts: string[], index: number): boolean => {
  return expressionParts[index] === SYMBOLS_VALUES.open_bracket;
};

const checkIsLastOperandSymbolDot = (operand: string): boolean => {
  return operand[operand.length - 1] === SYMBOLS_VALUES.dot;
};

const checkIsLastOperandSymbolWasZero = (expressionParts: string[], index: number): boolean => {
  return expressionParts[index][expressionParts[index].length - 1] === '0';
};

const checkIsExpressionEmpty = (expressionParts: string[], index: number): boolean => {
  const isExistExpressionPartByIndex: boolean = !!expressionParts[index];
  return isExistExpressionPartByIndex ? expressionParts[index].length < 1 : true;
};
