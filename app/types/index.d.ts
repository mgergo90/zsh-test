import { Reducer, Store, Observer } from 'redux';
import { RouterState } from 'connected-react-router';
import { Observable, Subject } from 'rxjs';
import { ActionType } from 'typesafe-actions';
import { Epic } from 'redux-observable';

import { ContainerState as LanguageProviderState } from 'containers/LanguageProvider/types';
import { AppState } from 'containers/App/types';
import { HomePageState } from 'containers/HomePage/types';

export type Action = ActionType<any>;

export interface InjectedStore extends Store {
  injectedReducers: any;
  epic$: Observable;
  injectedEpics: {
    [key: string]: Epic;
  };
}

export interface InjectReducerParams {
  key: keyof ApplicationRootState;
  reducer: Reducer<any, any>;
}

export interface InjectedEpicParams {
  key: string;
  epic: Epic;
}

export interface InjectSagaParams {
  key: keyof ApplicationRootState;
  saga: () => IterableIterator<any>;
  mode?: string | undefined;
}

// Your root reducer type, which is your redux state types also
export interface ApplicationRootState {
  readonly router: RouterState;
  readonly global: AppState;
  readonly language: LanguageProviderState;
  readonly homePage: HomePageState;
  // for testing purposes
  readonly test: any;
}

export type WithState<T> = [T, ApplicationRootState];
