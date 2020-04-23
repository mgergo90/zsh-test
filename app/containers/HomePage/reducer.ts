import produce from 'immer';
import { HomePageState, HomePageActions } from './types';
import { ActionTypes } from './constants';

export const initialState: HomePageState = {
  loading: false,
  result: [],
  selected: null,
  selectedLoading: false,
  wikiError: '',
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
        draft.loading = false;
        break;
      case ActionTypes.HOMEPAGE_SET_SELECTED:
        draft.selected = action.payload;
        draft.wikiError = '';
        draft.selectedLoading = true;
        break;
      case ActionTypes.HOMEPAGE_UPDATE_RESULT:
        draft.selectedLoading = false;
        draft.wikiError = '';
        draft.result = draft.result.map(item => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        });
        break;
      case ActionTypes.HOMEPAGE_SET_WIKI_ERROR:
        draft.wikiError = action.payload;
        draft.selectedLoading = false;
    }
  });

export default appReducer;
