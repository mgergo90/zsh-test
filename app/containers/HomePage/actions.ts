import { action } from 'typesafe-actions';
import { ActionTypes } from './constants';
import { Movie } from './types';

export const initSearch = (term: string) =>
  action(ActionTypes.HOMEPAGE_INIT_SEARCH, term);

export const setResults = (results: Movie[]) =>
  action(ActionTypes.HOMEPAGE_SET_RESULTS, results);

export const setSelected = (selected: Movie | null) =>
  action(ActionTypes.HOMEPAGE_SET_SELECTED, selected);

export const updateResult = (item: Movie) =>
  action(ActionTypes.HOMEPAGE_UPDATE_RESULT, item);

export const setWikiError = (error: string) =>
  action(ActionTypes.HOMEPAGE_SET_WIKI_ERROR, error);
