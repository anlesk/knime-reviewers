import { combineReducers } from 'redux';

import logging from '../redux/ducks/logging';
import articles from '../redux/ducks/articles';
import processes from '../redux/ducks/processes';

const rootReducer = combineReducers({
  logging,

  articles,
  processes,
});

export default rootReducer;
