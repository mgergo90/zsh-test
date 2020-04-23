import { ActionsObservable, combineEpics } from 'redux-observable';
import {
  HomePageActions,
  Movie,
  SetSelectedAction,
  StartSearchAction,
} from './types';
import { isOfType } from 'typesafe-actions';
import { ActionTypes } from './constants';
import { filter, switchMap, catchError } from 'rxjs/operators';
import { concat, of, from, iif } from 'rxjs';
import { setResults, updateResult, setWikiError } from './actions';
import {
  transformMovie,
  genereteWikiSearchUrl,
  generateOmdbSearchUrl,
} from './utils';
import { ajax } from 'rxjs/ajax';
import { setErrorMessage } from 'containers/App/actions';

export const startSearch = (action$: ActionsObservable<HomePageActions>) =>
  action$.pipe(
    filter(isOfType(ActionTypes.HOMEPAGE_INIT_SEARCH)),
    switchMap((action: StartSearchAction) =>
      iif(
        () => !!action.payload,
        ajax.getJSON(generateOmdbSearchUrl(action.payload)).pipe(
          switchMap((response: any) => {
            if (!response || !response.Search) {
              throw Error('Search yielded no results');
            }
            return of(setResults(response.Search.map(transformMovie)));
          }),
          catchError(error =>
            concat(
              of(setResults([])),
              of(
                setErrorMessage(
                  error.message ||
                    'Something went wrong, please try again later.',
                ),
              ),
            ),
          ),
        ),
        from([setResults([])]),
      ),
    ),
  );

export const loadWiki = (action$: ActionsObservable<HomePageActions>) =>
  action$.pipe(
    filter(isOfType(ActionTypes.HOMEPAGE_SET_SELECTED)),
    switchMap((action: SetSelectedAction) =>
      iif(
        () => !!action.payload && !action.payload.wiki,
        ajax.getJSON(genereteWikiSearchUrl(action.payload)).pipe(
          switchMap((response: any) => {
            if (!response || !response.query.search || !action.payload) {
              throw Error('Search yielded no results');
            }
            const firstReslt = response.query.search[0];
            const newItem: Movie = {
              ...action.payload,
              wiki: firstReslt.pageid,
              description: firstReslt.snippet,
            };
            return concat(of(updateResult(newItem)));
          }),
          catchError(error =>
            concat(
              of(
                setWikiError(
                  error.message ||
                    'Something went wrong, please try again later.',
                ),
              ),
            ),
          ),
        ),
        from([setWikiError('')]),
      ),
    ),
  );

export default combineEpics(startSearch, loadWiki);
