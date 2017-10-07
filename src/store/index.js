import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './combineReducers';
import rootEpic from './combineEpics';

const epicMiddleware = createEpicMiddleware(rootEpic);
const composedWithDevToolsMiddleware = composeWithDevTools(
  applyMiddleware(epicMiddleware),
);

const store = createStore(rootReducer, composedWithDevToolsMiddleware);

export default store;

