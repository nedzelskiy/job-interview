'use strict';

import store from '../../store';
import socketConf, { IMessage } from './socketConf';
import { throwError } from '../ErrorHandler/actions';
import { getCurrentTranslations } from '../../../both/translations';
import { SYMBOLS_SIGNS, SYMBOLS_VALUES } from '../../../both/constants';
import {
  addOperandSymbol, addOperationSymbol, addOpenBracket, addCloseBracket, addPercentages, changeSign,
  getExpressionParts, deleteSymbol as deleteSymbolInExpressionParts,
} from './logic';

const t = getCurrentTranslations();

export interface IAction {
  readonly type: 'UPDATE_EXPRESSION' | 'UPDATE_RESULT' | 'RESET' | 'WAIT_FOR_RESULT' | 'GOT_RESULT';
  readonly expressionParts: string[];
  readonly result: number;
  readonly error: string;
}

socketConf.setMessageHandler((response: string): void => {
  const data: IMessage = JSON.parse(response);
  if (!data.success) {
    throwError(data.message);
    store.dispatch(<IAction>{
      type: 'GOT_RESULT',
      result: parseFloat(data.result),
    });
  } else {
    store.dispatch(<IAction>{
      type: 'UPDATE_RESULT',
      result: parseFloat(data.result),
    });
  }
});


export const handleKeyUp = (event: KeyboardEvent): void => {
  if ('undefined' !== typeof SYMBOLS_SIGNS[event.key]) {
    addSymbol(SYMBOLS_SIGNS[event.key]);
  } else if (/[0-9]/.test(event.key)) {
    addSymbol(event.key);
  } else if ('Escape' === event.key) {
    resetCalculator();
  } else if ('Enter' === event.key || '=' === event.key) {
    getResult();
  } else if ('Backspace' === event.key || 'Delete' === event.key) {
    deleteSymbol();
  }
};

export const addSymbol = (symbol: string): void => {
  let ep: string[];
  if (/[0-9]+/.test(symbol)) {
    ep = addOperandSymbol(symbol);
  } else if (symbol === SYMBOLS_VALUES.dot) {
    ep = addOperandSymbol(symbol);
  } else if (symbol === SYMBOLS_VALUES.open_bracket) {
    ep = addOpenBracket(symbol);
  } else if (symbol === SYMBOLS_VALUES.close_bracket) {
    ep = addCloseBracket(symbol);
  } else if (symbol === SYMBOLS_VALUES.percentages) {
    ep = addPercentages(symbol);
  } else if (symbol === SYMBOLS_VALUES.change_sign) {
    ep = changeSign();
  } else {
    ep = addOperationSymbol(symbol);
  }
  store.dispatch(<IAction>{
    type: 'UPDATE_EXPRESSION',
    expressionParts: ep,
  });
};

export const deleteSymbol = (): void => {
  const ep: string[] = deleteSymbolInExpressionParts();
  store.dispatch(<IAction>{
    type: 'UPDATE_EXPRESSION',
    expressionParts: ep,
  });
};


export const resetCalculator = (): void => {
  store.dispatch(<IAction>{
    type: 'RESET',
  });
};

export const getResult = (): void => {
  const expressionParts: string[] = getExpressionParts();
  const socket: SocketIOClient.Socket = socketConf.getSocket();

  if (!socket) {
    throwError(t['Socket does not exist yet']);
    return;
  }

  const expression: string = expressionParts.join('');
  const countOpenBracket: number = expression.split(SYMBOLS_VALUES.open_bracket).length - 1;
  const countCloseBracket: number = expression.split(SYMBOLS_VALUES.close_bracket).length - 1;
  if (countCloseBracket !== countOpenBracket) {
    throwError(t['The number of opening and closing brackets are not equal!']);
    return;
  }
  socket.send(JSON.stringify(expressionParts));
  store.dispatch(<IAction>{
    type: 'WAIT_FOR_RESULT',
  });
};
