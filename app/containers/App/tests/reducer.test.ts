import appReducer from '../reducer';
import { setSearchTerm, setErrorMessage } from '../actions';
import { AppState } from '../types';

describe('appReducer', () => {
  let state: AppState;
  beforeEach(() => {
    state = {
      term: '',
      error: '',
    };
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(appReducer(undefined, {} as any)).toEqual(expectedResult);
  });

  it('should handle the setSearchTerm action correctly', () => {
    const term = 'term';
    const expectedResult = { ...state, term };

    expect(appReducer(state, setSearchTerm(term))).toEqual(expectedResult);
  });

  it('should handle the setErrorsMessage action correctly', () => {
    const error = 'Something went wrong';
    const expectedResult = { ...state, error };

    expect(appReducer(state, setErrorMessage(error))).toEqual(expectedResult);
  });
});
