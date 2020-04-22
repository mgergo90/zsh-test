import { ActionsObservable } from 'redux-observable';
import { HomePageActions } from './types';
import { isOfType } from 'typesafe-actions';
import { ActionTypes } from './constants';
import { filter, switchMap, catchError } from 'rxjs/operators';
import { concat, of, from, iif } from 'rxjs';
import { toggleLoading, setResults } from './actions';
import { transformMovie } from './utils';
import { ajax } from 'rxjs/ajax';
import { setErrorMessage } from 'containers/App/actions';

export const startSearch = (action$: ActionsObservable<HomePageActions>) =>
  action$.pipe(
    filter(isOfType(ActionTypes.HOMEPAGE_INIT_SEARCH)),
    switchMap((action: HomePageActions) =>
      iif(
        () => !!action.payload,
        ajax
          .getJSON(
            `http://www.omdbapi.com/?s=${encodeURI(
              action.payload.toString(),
            )}&apikey=7a4a45a0`,
          )
          .pipe(
            switchMap((response: any) => {
              if (!response || !response.Search) {
                throw Error('Search yielded no results');
              }
              return concat(
                of(toggleLoading(false)),
                of(setResults(response.Search.map(transformMovie))),
              );
            }),
            catchError(error =>
              concat(
                of(toggleLoading(false)),
                of(
                  setErrorMessage(
                    error.message ||
                      'Something went wrong, please try again later.',
                  ),
                ),
              ),
            ),
          ),
        from([setResults([]), toggleLoading(false)]),
      ),
    ),
  );

export default startSearch;
