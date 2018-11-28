'use strict';

import store from '../../store';
import { logError } from '../../util';

export interface IAction {
  readonly type: 'NEW_ERROR_MESSAGE' | 'HIDE_ERROR_MESSAGE';
  readonly error: string;
}

interface IDispatch {
  (param: IAction): void;
}

export const throwError = (err: string) => {
  logError(err);
  store.dispatch(<IAction>{
    type: 'NEW_ERROR_MESSAGE',
    error: err,
  });
  setTimeout(
    () => {
      store.dispatch(<IAction>{
        type: 'HIDE_ERROR_MESSAGE',
      });
    },
    3000,
  );
};

export const onMessageClick = () => (dispatch: IDispatch): void => {
  dispatch(<IAction>{
    type: 'HIDE_ERROR_MESSAGE',
  });
};
