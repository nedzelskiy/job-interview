'use strict';

import { SYMBOLS_VALUES } from '../../../both/constants';
import { addSymbol, resetCalculator, deleteSymbol, getResult } from './actions';

export interface IButton {
  title: string;
  className: string;
  onClick: Function;
}

export const buttonsProps: IButton[] = [
  {
    title: SYMBOLS_VALUES.reset_calc,
    className: 'actions reset',
    onClick: resetCalculator,
  },
  {
    title: SYMBOLS_VALUES.open_bracket,
    className: 'symbols open-bracket',
    onClick: addSymbol.bind(null, SYMBOLS_VALUES.open_bracket),
  },
  {
    title: SYMBOLS_VALUES.close_bracket,
    className: 'symbols close-bracket',
    onClick: addSymbol.bind(null, SYMBOLS_VALUES.close_bracket),
  },
  {
    title: SYMBOLS_VALUES.delete_symbol,
    className: 'actions delete',
    onClick: deleteSymbol,
  },
  {
    title: SYMBOLS_VALUES.percentages,
    className: 'symbols percentages',
    onClick: addSymbol.bind(null, SYMBOLS_VALUES.percentages),
  },
  {
    title: SYMBOLS_VALUES.change_sign,
    className: 'actions change-sign',
    onClick: addSymbol.bind(null, SYMBOLS_VALUES.change_sign),
  },
  {
    title: SYMBOLS_VALUES.power,
    className: 'symbols power',
    onClick: addSymbol.bind(null, SYMBOLS_VALUES.power),
  },
  {
    title: SYMBOLS_VALUES.summation,
    className: 'symbols summation',
    onClick: addSymbol.bind(null, SYMBOLS_VALUES.summation),
  },
  {
    title: '7',
    className: 'digit',
    onClick: addSymbol.bind(null, '7'),
  },
  {
    title: '8',
    className: 'digit',
    onClick: addSymbol.bind(null, '8'),
  },
  {
    title: '9',
    className: 'digit',
    onClick: addSymbol.bind(null, '9'),
  },
  {
    title: SYMBOLS_VALUES.subtraction,
    className: 'symbols subtraction',
    onClick: addSymbol.bind(null, SYMBOLS_VALUES.subtraction),
  },
  {
    title: '4',
    className: 'digit',
    onClick: addSymbol.bind(null, '4'),
  },
  {
    title: '5',
    className: 'digit',
    onClick: addSymbol.bind(null, '5'),
  },
  {
    title: '6',
    className: 'digit',
    onClick: addSymbol.bind(null, '6'),
  },
  {
    title: SYMBOLS_VALUES.multiplication,
    className: 'symbols multiplication',
    onClick: addSymbol.bind(null, SYMBOLS_VALUES.multiplication),
  },
  {
    title: '1',
    className: 'digit',
    onClick: addSymbol.bind(null, '1'),
  },
  {
    title: '2',
    className: 'digit',
    onClick: addSymbol.bind(null, '2'),
  },
  {
    title: '3',
    className: 'digit',
    onClick: addSymbol.bind(null, '3'),
  },
  {
    title: SYMBOLS_VALUES.division,
    className: 'symbols division',
    onClick: addSymbol.bind(null, SYMBOLS_VALUES.division),
  },
  {
    title: '0',
    className: 'digit',
    onClick: addSymbol.bind(null, '0'),
  },
  {
    title: SYMBOLS_VALUES.dot,
    className: 'symbols dot',
    onClick: addSymbol.bind(null, SYMBOLS_VALUES.dot),
  },
  {
    title: SYMBOLS_VALUES.sign_equal,
    className: 'actions result',
    onClick: getResult,
  },
];
