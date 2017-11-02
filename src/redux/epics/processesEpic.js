import { ajax } from 'rxjs/observable/dom/ajax';
import { of as of$ } from 'rxjs/observable/of'
import { concat as concat$ } from 'rxjs/observable/concat'
import { isEmpty } from 'lodash';

import { LOAD_PROCESSES, START_PROCESS } from "../ducks/processes";
import { genericSuccessAC, genericStartAC, genericFailAC } from '../utils/genericAC';
import config from '../../config/config.common'


const loadProcessesSuccess = response => genericSuccessAC(LOAD_PROCESSES, response);
const loadProcessesStart = () => genericStartAC(LOAD_PROCESSES);
const loadProcessesFail = ({ xhr: { response } }) => of$(genericFailAC(LOAD_PROCESSES, response || {}));
const loadProcessesSuccessPost = ({ response }) => loadProcessesSuccess(response);
const filterEmpty = params => params.filter(p => !isEmpty(p));

const getProcesses  = params => ajax.getJSON(`${config.baseUrl}/processes`);
const startProcess = params => ajax.post(`${config.baseUrl}/startProcess`, filterEmpty(params), { 'Content-Type': 'application/json' });

export const startProcessEpic = action$ =>
  action$.ofType(START_PROCESS)
    .switchMap(action =>
      concat$(
        of$(loadProcessesStart()),
        startProcess(action.payload)
          .map(loadProcessesSuccessPost)
          .catch(loadProcessesFail)
      ));

export const loadProcessesEpic = action$ =>
  action$.ofType(LOAD_PROCESSES)
    .switchMap(action =>
      concat$(
        of$(loadProcessesStart()),
        getProcesses(action.payload)
          .map(loadProcessesSuccess)
          .catch(loadProcessesFail)
      ));
