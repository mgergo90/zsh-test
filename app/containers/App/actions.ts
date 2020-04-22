import { action } from 'typesafe-actions';
import { ActionTypes } from './constants';

export const triggerSearch = (term: string) =>
  action(ActionTypes.GLOBAL_TRIGGER_SEARCH, term);

export const setSearchTerm = (term: string) =>
  action(ActionTypes.GLOBAL_SET_SEARCH_TERM, term);
