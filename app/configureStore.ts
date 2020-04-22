/**
 * Create the store with dynamic reducers
 */

import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createReducer from './reducers';
import { InjectedStore, ApplicationRootState, Action } from 'types';
import { History } from 'history';
import {
  createEpicMiddleware,
  ofType,
  ActionsObservable,
  StateObservable,
  Epic,
} from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Subject, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

export default function configureStore(
  initialState: ApplicationRootState | {} = {},
  history: History,
) {
  const epicMiddleware = createEpicMiddleware();

  let enhancer = applyMiddleware(routerMiddleware(history), epicMiddleware);

  // If Redux Dev Tools Extension is installed, enable them
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
    enhancer = composeWithDevTools(enhancer);
  }

  const store = createStore(
    createReducer(),
    initialState,
    enhancer,
  ) as InjectedStore;

  store.epic$ = new Subject<ApplicationRootState>();
  const hotReloadingEpic = (
    action$: ActionsObservable<Action>,
    state$: StateObservable<any>,
    dependencies?: any,
  ): Observable<Action> =>
    store.epic$.pipe(
      mergeMap((epic: Epic) => epic(action$, state$, dependencies)),
    );

  epicMiddleware.run(hotReloadingEpic);

  store.injectedReducers = {}; // Reducer registry
  store.injectedEpics = {}; // Epic registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return store;
}
