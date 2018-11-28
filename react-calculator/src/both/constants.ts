'use strict';

export const SYMBOLS_VALUES: {
  [propName: string]: string,
} = {
  dot: '.',
  open_bracket: ' ( ',
  close_bracket: ' ) ',
  multiplication: ' x ',
  division: ' / ',
  summation: ' + ',
  subtraction: ' - ',
  sign_minus: '-',
  reset_calc: 'AC',
  sign_equal: '=',
  delete_symbol: 'DEL',
  change_sign: '+/-',
  percentages: '%',
  power: ' ^ ',
};

export const SYMBOLS_SIGNS: {
  [propName: string]: string,
} = {
  '(': SYMBOLS_VALUES.open_bracket,
  ')': SYMBOLS_VALUES.close_bracket,
  '*': SYMBOLS_VALUES.multiplication,
  '/': SYMBOLS_VALUES.division,
  '+': SYMBOLS_VALUES.summation,
  '-': SYMBOLS_VALUES.subtraction,
  '%': SYMBOLS_VALUES.percentages,
  '^': SYMBOLS_VALUES.power,
  '.': SYMBOLS_VALUES.dot,
};
