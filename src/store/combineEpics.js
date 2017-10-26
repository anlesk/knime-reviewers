import { combineEpics } from 'redux-observable';

import { loadArticlesEpic } from '../redux/epics/loadArticlesEpic';
import { loadProcessesEpic, loadProcessEpic } from '../redux/epics/loadProcessesEpic';

const rootEpic = combineEpics(
  loadArticlesEpic,
  loadProcessesEpic,
  loadProcessEpic,
);

export default rootEpic;