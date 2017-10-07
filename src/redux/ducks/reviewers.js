import { SUCCESS, START, FAIL } from '../utils/constants';


export const LOAD_REVIEWERS = 'LOAD_REVIEWERS';

const initialState = {
  reviewers: [],
};

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_REVIEWERS + SUCCESS: {
      return {
        ...state,
        reviewers: payload,
      }
    }

    default:
      return state;
  }
}

export const loadReviewersEpicAC = payload => ({ type: LOAD_REVIEWERS, payload });

export const getReviewers = state => state.reviewers.reviewers;