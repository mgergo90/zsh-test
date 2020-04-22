import appReducer from '../reducer';
import { setSearchTerm } from '../actions';
import { AppState } from '../types';

describe('appReducer', () => {
  let state: AppState;
  beforeEach(() => {
    state = {
      term: '',
    };
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(appReducer(undefined, {} as any)).toEqual(expectedResult);
  });

  it('should handle the setSearchTerm action correctly', () => {
    const term = 'term';
    const expectedResult = { term };

    expect(appReducer(state, setSearchTerm(term))).toEqual(expectedResult);
  });
});
