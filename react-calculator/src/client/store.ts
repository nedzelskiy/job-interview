'use strict';

import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, combineReducers, ReducersMapObject, Reducer } from 'redux';

// dynamic load reducers from components
const reducers: ReducersMapObject = {};

const reducersHandler = (v: string): void => {
  const reducer: Reducer<{}> = req(v)['default'];
  const reducerName: string = v.split('/')[1];
  reducers[reducerName] = reducer;
};

let req = require.context('./components/', true, /reducer\.tsx?$/);
req.keys().forEach(reducersHandler);
req = require.context('./containers/', true, /reducer\.tsx?$/);
req.keys().forEach(reducersHandler);

export default
  createStore(combineReducers(reducers), composeWithDevTools(applyMiddleware(reduxThunk)));
