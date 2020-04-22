import produce from 'immer';
import { HomePageState, HomePageActions } from './types';
import { ActionTypes } from './constants';

// The initial state of the App
export const initialState: HomePageState = {
  loading: false,
  result: [],
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (
  state: HomePageState = initialState,
  action: HomePageActions,
): HomePageState =>
  produce(state, draft => {
    switch (action.type) {
      case ActionTypes.HOMEPAGE_INIT_SEARCH:
        draft.loading = true;
        break;
      case ActionTypes.HOMEPAGE_SET_RESULTS:
        draft.result = action.payload;
        break;
      case ActionTypes.HOMEPAGE_TOGGLE_LOADING:
        draft.loading = action.payload;
    }
  });

export default appReducer;
