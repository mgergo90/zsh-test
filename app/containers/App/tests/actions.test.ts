import * as actions from '../actions';
import { action } from 'typesafe-actions';
import { ActionTypes } from '../constants';

describe('Global actions', () => {
  it('should trigger search with term', () => {
    const term = 'term';
    expect(actions.triggerSearch(term)).toEqual(
      action(ActionTypes.GLOBAL_TRIGGER_SEARCH, term),
    );
  });
  it('should set the search term', () => {
    const term = 'term';
    expect(actions.setSearchTerm(term)).toEqual(
      action(ActionTypes.GLOBAL_SET_SEARCH_TERM, term),
    );
  });
});
