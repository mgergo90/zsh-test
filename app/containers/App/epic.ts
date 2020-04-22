import { ActionsObservable, StateObservable } from 'redux-observable';
import {
  switchMap,
  filter,
  withLatestFrom,
  throttleTime,
  debounceTime,
} from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';
import { ApplicationRootState, WithState } from 'types';
import { of } from 'rxjs';
import history from 'utils/history';

import { ActionTypes } from './constants';
import { selectPath } from './selectors';
import { AppActions } from './types';
import { setSearchTerm } from './actions';

export const triggerSearch = (
  action$: ActionsObservable<AppActions>,
  state$: StateObservable<ApplicationRootState>,
) =>
  action$.pipe(
    filter(isOfType(ActionTypes.GLOBAL_TRIGGER_SEARCH)),
    debounceTime(500),
    withLatestFrom(state$),
    switchMap(([action, state]: WithState<AppActions>) => {
      if (selectPath(state) !== '/') {
        history.push('/');
      }
      return of(setSearchTerm(action.payload));
    }),
  );

export default triggerSearch;
