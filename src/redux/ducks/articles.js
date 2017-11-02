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
            isShown: true,
          },
        },
      }
    }

    case LOAD_ARTICLES + FAIL: {
      const { message = 'Oops... Something goes wrong! We are sorry about that!' } = payload;

      return {
        ...state,
        articles: {
          _status: {
            isLoading: false,
            isShown: true,
            error: message,
          },
        },
      }
    }

    case LOAD_ARTICLES + SUCCESS: {
      return {
        ...state,
        articles: {
          items: payload,
          _status: {
            isShown: true,
          },
        },
      }
    }

    default:
      return state;
  }
}

export const loadArticlesEpicAC = id => ({ type: LOAD_ARTICLES, payload: { id } });

export const getArticles = state => state.articles.articles;