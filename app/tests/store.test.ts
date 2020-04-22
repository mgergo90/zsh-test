/**
 * Test store addons
 */
import history from '../utils/history';
import configureStore from '../configureStore';
import { InjectedStore } from '../types';
import { composeWithDevTools } from 'redux-devtools-extension';

describe('configureStore', () => {
  let store: InjectedStore;
  // hide false warning from output
  jest.spyOn(global.console, 'warn').mockImplementation(() => jest.fn());
  beforeAll(() => {
    store = configureStore({}, history);
  });

  describe('injectedReducers', () => {
    it('should contain an object for reducers', () => {
      expect(typeof store.injectedReducers).toBe('object');
    });
  });
});

jest.mock('redux-devtools-extension', () => ({
  composeWithDevTools: jest.fn(),
}));

describe('configureStore params', () => {
  it('should call composeWithDevTools', () => {
    configureStore(undefined, history);
    expect(composeWithDevTools).toHaveBeenCalled();
  });
});
