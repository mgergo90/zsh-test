import * as actions from './actions';
import { ActionType } from 'typesafe-actions';

export type HomePageActions = ActionType<typeof actions>;

export interface Movie {
  id: string;
  title: string;
  year: string;
  image: string;
  type: string;
}

export interface HomePageState {
  loading: boolean;
  result: Movie[];
}
