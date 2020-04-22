import { action } from 'typesafe-actions';
import { ActionTypes } from './constants';
import { Movie } from './types';

export const initSearch = (term: string) =>
  action(ActionTypes.HOMEPAGE_INIT_SEARCH, term);

export const toggleLoading = (loading: boolean) =>
  action(ActionTypes.HOMEPAGE_TOGGLE_LOADING, loading);

export const setResults = (results: Movie[]) =>
  action(ActionTypes.HOMEPAGE_SET_RESULTS, results);
