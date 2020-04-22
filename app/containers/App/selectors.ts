import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';

const selectRoute = (state: ApplicationRootState) => state.router;

const makeSelectLocation = () =>
  createSelector(selectRoute, routeState => routeState.location);

export const selectPath = (state: ApplicationRootState) =>
  selectRoute(state).location.pathname;

export const selectSearchTerm = (state: ApplicationRootState) =>
  state.global.term;

export const selectError = (state: ApplicationRootState) => state.global.error;

export { makeSelectLocation };
