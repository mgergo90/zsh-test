import * as actions from './actions';
import { ActionType } from 'typesafe-actions';

export type HomePageActions = ActionType<typeof actions>;

export type SetSelectedAction = ActionType<typeof actions.setSelected>;
export type StartSearchAction = ActionType<typeof actions.initSearch>;

export interface Movie {
  id: string;
  title: string;
  year: string;
  image: string;
  type: string;
  description?: string;
  wiki?: string;
}

export interface HomePageState {
  loading: boolean;
  result: Movie[];
  selected: Movie | null;
  selectedLoading: boolean;
  wikiError: string;
}

export interface ItemProps {
  id: string;
}
