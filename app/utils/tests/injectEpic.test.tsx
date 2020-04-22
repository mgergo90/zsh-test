// tslint:disable:no-object-literal-type-assertion
import * as Redux from 'react-redux';
import { mapTo } from 'rxjs/operators';
import { ActionsObservable, Epic } from 'redux-observable';

import { InjectedStore } from 'types';
import useInjectEpic from '../injectEpic';

jest.mock('react-redux');

describe('injectEpic', () => {
  it('should inject new epic to store', () => {
    jest.spyOn(Redux, 'useStore').mockReturnValueOnce({
      injectedReducers: {},
      injectedEpics: {},
      epic$: {
        next: jest.fn(),
      },
    } as InjectedStore);
    const epic: Epic = (action$: ActionsObservable<any>) =>
      action$.pipe(mapTo({ type: 'empty' }));
    const store = useInjectEpic({ key: 'test', epic });
    expect(store.epic$.next).toHaveBeenCalledTimes(1);
  });

  it('should not inject epic twice', () => {
    const epic: Epic = (action$: ActionsObservable<any>) =>
      action$.pipe(mapTo({ type: 'empty' }));
    jest.spyOn(Redux, 'useStore').mockReturnValueOnce(({
      injectedReducers: {},
      injectedEpics: {
        test: epic,
      },
      epic$: {
        next: jest.fn(),
      },
    } as unknown) as InjectedStore);

    const store = useInjectEpic({ key: 'test', epic });
    expect(store.epic$.next).toHaveBeenCalledTimes(0);
  });
});
