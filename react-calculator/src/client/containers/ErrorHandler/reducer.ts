'use strict';

import { IAction } from './actions';

export interface IState {
  error: string;
  show: boolean;
}

const defaultState: IState = {
  error: '',
  show: false,
};

export default (state = defaultState, action: IAction) => {
  if (action.type === 'NEW_ERROR_MESSAGE') {
    return {
      error: action.error,
      show: true,
    };
  }
  if (action.type === 'HIDE_ERROR_MESSAGE') {
    return {
      ...state,
      show: false,
    };
  }
  return state;
};
