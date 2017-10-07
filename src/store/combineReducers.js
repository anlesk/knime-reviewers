import { combineReducers } from 'redux';

import logging from '../redux/ducks/logging';
import reviewers from '../redux/ducks/reviewers';

const rootReducer = combineReducers({
  logging,

  reviewers,
});

export default rootReducer;
