import { ajax } from 'rxjs/observable/dom/ajax';
import { stringify } from 'query-string';

import { LOAD_REVIEWERS } from "../ducks/reviewers";
import { genericSuccessAC } from '../utils/genericAC';
import config from '../../config/config.common'


export const loadReviewersEpic = action$ =>
  action$.ofType(LOAD_REVIEWERS)
    .mergeMap(action =>
      ajax.getJSON(`${config.baseUrl}/reviewers?${stringify(action.payload)}`)
        .map(response => genericSuccessAC(LOAD_REVIEWERS, response))
    );