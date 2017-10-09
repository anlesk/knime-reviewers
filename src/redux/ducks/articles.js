import { SUCCESS, START, FAIL } from '../utils/constants';


export const LOAD_ARTICLES = 'LOAD_ARTICLES';

const initialState = {
  articles: [],
};

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_ARTICLES + SUCCESS: {
      return {
        ...state,
        articles: payload,
      }
    }

    default:
      return state;
  }
}

export const loadArticlesEpicAC = payload => ({ type: LOAD_ARTICLES, payload });

export const getArticles = state => state.articles.articles;