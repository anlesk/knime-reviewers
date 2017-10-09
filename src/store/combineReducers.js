import { combineReducers } from 'redux';

import logging from '../redux/ducks/logging';
import articles from '../redux/ducks/articles';

const rootReducer = combineReducers({
  logging,

  articles,
});

export default rootReducer;
