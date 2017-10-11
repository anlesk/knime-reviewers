import { ajax } from 'rxjs/observable/dom/ajax';
import { stringify } from 'query-string';
import { of as of$ } from 'rxjs/observable/of'
import { concat as concat$ } from 'rxjs/observable/concat'

import { LOAD_ARTICLES } from "../ducks/articles";
import { genericSuccessAC, genericStartAC, genericFailAC } from '../utils/genericAC';
import config from '../../config/config.common'


const DEBOUNCE_TIME = 300;
const loadArticlesSuccess = response => genericSuccessAC(LOAD_ARTICLES, response);
const loadArticlesFail = response => genericFailAC(LOAD_ARTICLES, response);
const getArticles  = params => ajax.getJSON(`${config.baseUrl}/articles?${stringify(params)}`);

export const loadArticlesEpic = action$ =>
  action$.ofType(LOAD_ARTICLES)
    .debounceTime(DEBOUNCE_TIME)
    .switchMap(action =>
      concat$(
        of$(genericStartAC(LOAD_ARTICLES)),
        getArticles(action.payload)
          .map(loadArticlesSuccess)
          .catch(loadArticlesFail)),
      );