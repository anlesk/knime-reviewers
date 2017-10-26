import { ajax } from 'rxjs/observable/dom/ajax';
import { stringify } from 'query-string';
import { of as of$ } from 'rxjs/observable/of'
import { concat as concat$ } from 'rxjs/observable/concat'

import { LOAD_PROCESSES, LOAD_PROCESS } from "../ducks/processes";
import { loadArticlesStart, loadArticlesSuccess, loadArticlesFail } from './loadArticlesEpic';
import { genericSuccessAC, genericStartAC, genericFailAC } from '../utils/genericAC';
import config from '../../config/config.common'


export const loadProcessesSuccess = response => genericSuccessAC(LOAD_PROCESSES, response);
const loadProcessesFail = ({ xhr: { response } }) => of$(genericFailAC(LOAD_PROCESSES, response || {}));
const getProcesses  = params => ajax.getJSON(`${config.baseUrl}/process`);
const getProcess  = params => ajax.getJSON(`${config.baseUrl}/result?${stringify(params)}`);

export const loadProcessesEpic = action$ =>
  action$.ofType(LOAD_PROCESSES)
    .switchMap(action =>
      concat$(
        of$(genericStartAC(LOAD_PROCESSES)),
        getProcesses(action.payload)
          .map(loadProcessesSuccess)
          .catch(loadProcessesFail)
      ));

export const loadProcessEpic = action$ =>
  action$.ofType(LOAD_PROCESS)
    .switchMap(action =>
      concat$(
        of$(loadArticlesStart()),
        getProcess(action.payload)
          .map(loadArticlesSuccess)
          .catch(loadArticlesFail)
      ));
