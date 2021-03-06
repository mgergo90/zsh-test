import produce from 'immer';
import { AppState, AppActions } from './types';
import { ActionTypes } from './constants';

// The initial state of the App
export const initialState: AppState = {
  term: '',
  error: '',
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (
  state: AppState = initialState,
  action: AppActions,
): AppState =>
  produce(state, draft => {
    switch (action.type) {
      case ActionTypes.GLOBAL_SET_SEARCH_TERM:
        draft.term = action.payload;
        draft.error = '';
        break;
      case ActionTypes.GLOBAL_SET_ERROR_MESSAGE:
        draft.error = action.payload;
        break;
    }
  });

export default appReducer;
