import { combineEpics } from 'redux-observable';

import { loadArticlesEpic } from '../redux/epics/loadArticlesEpic';

const rootEpic = combineEpics(
  loadArticlesEpic,
);

export default rootEpic;