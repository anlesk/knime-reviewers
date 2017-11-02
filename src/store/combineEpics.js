import { combineEpics } from 'redux-observable';

import { loadArticlesEpic } from '../redux/epics/loadArticlesEpic';
import { loadProcessesEpic, startProcessEpic } from '../redux/epics/processesEpic';

const rootEpic = combineEpics(
  loadArticlesEpic,
  loadProcessesEpic,
  startProcessEpic,
);

export default rootEpic;