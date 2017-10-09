import { ajax } from 'rxjs/observable/dom/ajax';
import { stringify } from 'query-string';

import { LOAD_ARTICLES } from "../ducks/articles";
import { genericSuccessAC } from '../utils/genericAC';
import config from '../../config/config.common'


export const loadArticlesEpic = action$ =>
  action$.ofType(LOAD_ARTICLES)
    .mergeMap(action =>
      ajax.getJSON(`${config.baseUrl}/articles?${stringify(action.payload)}`)
        .map(response => genericSuccessAC(LOAD_ARTICLES, response))
    );