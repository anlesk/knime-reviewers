import { SUCCESS, START, FAIL } from '../utils/constants';

export const LOAD_PROCESSES = 'LOAD_PROCESSES';
export const LOAD_PROCESS = 'LOAD_PROCESS';

const initialState = {
  processes: {},
  _status: {
    isLoading: false,
  }
};

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_PROCESSES + START: {
      return {
        ...state,
        _status: {
          isLoading: true,
        }
      };
    }

    case LOAD_PROCESSES + FAIL: {
      const { message = 'Oops... Something goes wrong! We are sorry about that!' } = payload;

      return {
        ...state,
        _status: {
          isLoading: false,
          error: message,
        }
      };
    }

    case LOAD_PROCESSES + SUCCESS: {
      return {
        ...state,
        processes: payload,
        _status: {
          isLoading: false,
        }
      };
    }

    default: {
      return state;
    }
  }
}

export const loadProcessesEpicAC = () => ({ type: LOAD_PROCESSES });
export const loadProcessEpicAC = id => ({ type: LOAD_PROCESS, payload: { id } });

export const getProcesses = state => state.processes;
