import * as actions from './actions';

export type AppActions = ActionType<typeof actions>;

export interface AppState {
  term: string;
}
