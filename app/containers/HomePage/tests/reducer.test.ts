import homePageReducer from '../reducer';
import { HomePageState } from '../types';
import * as actions from '../actions';

const testMovie = {
  id: 'id',
  title: 'title',
  year: '2020',
  image: 'image',
  type: 'movie',
};

describe('homePageReducer', () => {
  let state: HomePageState;
  beforeEach(() => {
    state = {
      loading: false,
      result: [],
      selectedLoading: false,
      selected: null,
      wikiError: '',
    };
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(homePageReducer(undefined, {} as any)).toEqual(expectedResult);
  });

  it('should handle the initSearch action correctly', () => {
    const term = 'term';
    const expectedResult = { ...state, loading: true };
    expect(homePageReducer(state, actions.initSearch(term))).toEqual(
      expectedResult,
    );
  });

  it('should handle the setResults action correctly', () => {
    const expectedResult = { ...state, result: [testMovie], loading: false };
    expect(homePageReducer(state, actions.setResults([testMovie]))).toEqual(
      expectedResult,
    );
  });

  it('should handle the setSelected action correctly', () => {
    const expectedResult = {
      ...state,
      selected: testMovie,
      selectedLoading: true,
      wikiError: '',
    };
    expect(
      homePageReducer(
        { ...state, wikiError: 'error' },
        actions.setSelected(testMovie),
      ),
    ).toEqual(expectedResult);
  });

  it('should handle the updateResult action correctly', () => {
    const initState = {
      ...state,
      result: [testMovie],
      selectedLoading: true,
      wikiError: 'error',
    };
    const expectedResult = {
      ...state,
      selectedLoading: false,
      wikiError: '',
      result: [{ ...testMovie, wiki: '20', description: 'desc' }],
    };

    expect(
      homePageReducer(
        initState,
        actions.updateResult({ ...testMovie, wiki: '20', description: 'desc' }),
      ),
    ).toEqual(expectedResult);
  });

  it('should handle the setWikiError action correctly', () => {
    const initState = {
      ...state,
      selectedLoading: true,
    };
    const expectedResult = {
      ...state,
      selectedLoading: false,
      wikiError: 'error',
    };

    expect(homePageReducer(initState, actions.setWikiError('error'))).toEqual(
      expectedResult,
    );
  });
});
