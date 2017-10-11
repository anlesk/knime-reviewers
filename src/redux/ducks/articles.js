import { SUCCESS, START, FAIL } from '../utils/constants';


export const LOAD_ARTICLES = 'LOAD_ARTICLES';

const initialState = {
  articles: {
    items: [],
    _status: {
      isShown: false,
    }
  },
};

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_ARTICLES + START: {
      return {
        ...state,
        articles: {
          _status: {
            isLoading: true,
          },
          items: payload
        },
      }
    }

    case LOAD_ARTICLES + FAIL: {
      return {
        ...state,
        articles: {
          _status: {
            isLoading: false,
            error: payload.msg,
          },
        },
      }
    }

    case LOAD_ARTICLES + SUCCESS: {
      return {
        ...state,
        articles: {
          items: payload,
        },
      }
    }

    default:
      return state;
  }
}

export const loadArticlesEpicAC = payload => ({ type: LOAD_ARTICLES, payload });

export const getArticles = state => state.articles.articles;