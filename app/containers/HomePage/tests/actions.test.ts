import * as actions from '../actions';
import { action } from 'typesafe-actions';
import { ActionTypes } from '../constants';

describe('HomePage actions', () => {
  const testMovie = {
    id: 'id',
    title: 'title',
    year: '2020',
    image: 'image',
    type: 'movie',
  };

  it('should trigger search with term', () => {
    const term = 'term';
    expect(actions.initSearch(term)).toEqual(
      action(ActionTypes.HOMEPAGE_INIT_SEARCH, term),
    );
  });

  it('should set the search results', () => {
    const results = [testMovie];
    expect(actions.setResults(results)).toEqual(
      action(ActionTypes.HOMEPAGE_SET_RESULTS, results),
    );
  });

  it('should set current movie', () => {
    expect(actions.setSelected(testMovie)).toEqual(
      action(ActionTypes.HOMEPAGE_SET_SELECTED, testMovie),
    );
  });

  it('should update movie', () => {
    expect(actions.updateResult(testMovie)).toEqual(
      action(ActionTypes.HOMEPAGE_UPDATE_RESULT, testMovie),
    );
  });

  it('should set wiki api error', () => {
    const error = 'Something went wrong';
    expect(actions.setWikiError(error)).toEqual(
      action(ActionTypes.HOMEPAGE_SET_WIKI_ERROR, error),
    );
  });
});
