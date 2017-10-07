import { combineEpics } from 'redux-observable';

import { loadReviewersEpic } from '../redux/epics/loadReviewersEpic';

const rootEpic = combineEpics(
  loadReviewersEpic,
);

export default rootEpic;