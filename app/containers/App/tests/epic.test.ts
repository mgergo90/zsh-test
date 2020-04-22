import { TestScheduler } from 'rxjs/testing';

import history from 'utils/history';
import * as actions from '../actions';
import * as epic from '../epic';
import { ActionsObservable } from 'redux-observable';

jest.mock('utils/history');

const testScheduler = new TestScheduler((actual, expected) => {
  expect(actual).toEqual(expected);
});

describe('App epic tests', () => {
  it('should redirect to homepage from any other page', () => {
    testScheduler.run(({ hot, expectObservable, cold }) => {
      const term = 'term';
      const action$ = new ActionsObservable(
        hot('a', {
          a: actions.triggerSearch('term'),
        }),
      );
      const state = {
        router: {
          location: {
            pathname: '/nothomepage',
          },
        },
      };
      const state$: any = cold('a', {
        a: state,
      });
      const output$ = epic.triggerSearch(action$, state$);
      expectObservable(output$).toBe(`${'-'.repeat(250)}a`, {
        a: actions.setSearchTerm(term),
      });
      setTimeout(() => expect(history.push).toHaveBeenCalledTimes(1), 500);
    });
  });
});
