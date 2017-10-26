import { ajax } from 'rxjs/observable/dom/ajax';
import { stringify } from 'query-string';
import { of as of$ } from 'rxjs/observable/of'
import { concat as concat$ } from 'rxjs/observable/concat'

import { LOAD_ARTICLES } from "../ducks/articles";
import { loadProcessesSuccess } from './loadProcessesEpic';
import { genericSuccessAC, genericStartAC, genericFailAC } from '../utils/genericAC';
import config from '../../config/config.common'


export const loadArticlesStart = () => genericStartAC(LOAD_ARTICLES);
export const loadArticlesSuccess = response => genericSuccessAC(LOAD_ARTICLES, response);
export const loadArticlesFail = ({ xhr: { response } }) => of$(genericFailAC(LOAD_ARTICLES, response));
const getArticles = params => ajax.getJSON(`${config.baseUrl}/articles?${stringify(params)}`);

export const loadArticlesEpic = action$ =>
  action$.ofType(LOAD_ARTICLES)
    .switchMap(action =>
      concat$(
        of$(loadArticlesStart()),
        getArticles(action.payload)
          .map(loadProcessesSuccess)
          .catch(loadArticlesFail)
      ));
