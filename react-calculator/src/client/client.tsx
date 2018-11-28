'use strict';

import './main.scss';
import store from './store';
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Calculator from './containers/Calculator';
import ErrorHandler from './containers/ErrorHandler';

render(
  <Provider store={ store }>
    <div className="wrapper">
      <ErrorHandler/>
      <Calculator/>
    </div>
  </Provider>,
  document.querySelector('#mount'),
);
