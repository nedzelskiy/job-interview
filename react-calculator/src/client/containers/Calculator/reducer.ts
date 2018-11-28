'use strict';

import { IAction } from './actions';

export interface IState {
  result: number;
  didGetResult: boolean;
  isGettingResult: boolean;
  expressionParts: string[];
}

const defaultState: IState = {
  result: 0,
  isGettingResult: false,
  didGetResult: false,
  expressionParts: [],
};

export default (state = defaultState, action: IAction) => {
  if (action.type === 'UPDATE_EXPRESSION') {
    return {
      ...state,
      expressionParts: action.expressionParts,
      didGetResult: false,
    };
  }
  if (action.type === 'UPDATE_RESULT') {
    return {
      ...state,
      result: action.result,
      didGetResult: true,
      isGettingResult: false,
    };
  }
  if (action.type === 'RESET') {
    return defaultState;
  }
  if (action.type === 'GOT_RESULT') {
    return {
      ...state,
      isGettingResult: false,
    };
  }
  return state;
};
