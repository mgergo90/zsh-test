/**
 * Test injectors
 */

import checkStore from '../checkStore';

describe('checkStore', () => {
  let store;

  beforeEach(() => {
    store = {
      dispatch: () => {},
      subscribe: () => {},
      getState: () => {},
      replaceReducer: () => {},
      epic$: () => {},
      injectedReducers: {},
      injectedEpics: {},
    };
  });

  it('should not throw if passed valid store shape', () => {
    expect(() => checkStore(store)).not.toThrow();
  });

  it('should throw if passed invalid store shape', () => {
    expect(() => checkStore({})).toThrow();
    expect(() => checkStore({ ...store, injectedEpics: null })).toThrow();
    expect(() => checkStore({ ...store, injectedReducers: null })).toThrow();
    expect(() => checkStore({ ...store, epic$: null })).toThrow();
    expect(() => checkStore({ ...store, replaceReducer: null })).toThrow();
  });
});
