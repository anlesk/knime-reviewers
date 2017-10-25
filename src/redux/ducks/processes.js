import { SUCCESS, START, FAIL } from '../utils/constants';

const LOAD_PROCESSES = 'LOAD_PROCESSES';

const initialState = [];

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_PROCESSES + START: {
      return state;
    }

    case LOAD_PROCESSES + FAIL: {
      return state;
    }

    case LOAD_PROCESSES + SUCCESS: {
      return state;
    }

    default: {
      return state;
    }
  }
}

export const loadProcessesEpicAC = () => ({ type: LOAD_PROCESSES });
