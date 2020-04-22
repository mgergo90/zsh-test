import * as actions from './actions';
import { ActionType } from 'typesafe-actions';

export type AppActions = ActionType<typeof actions>;

export interface AppState {
  term: string;
  error: string;
}
