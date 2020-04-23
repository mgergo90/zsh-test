import { ApplicationRootState } from 'types';
import { createSelector } from 'reselect';
import { HomePageState } from './types';

const selectHomePage = ({ homePage }: ApplicationRootState) => homePage;

export const selectResultsId = createSelector(
  selectHomePage,
  ({ result }: HomePageState) => result.map(item => item.id),
);

export const makeSelectResultItem = (id: string) =>
  createSelector(selectHomePage, ({ result }: HomePageState) =>
    result.find(item => item.id === id),
  );

export const selectLoading = ({ homePage }: ApplicationRootState) =>
  homePage.loading;

export const selectSelectedItem = ({ homePage }: ApplicationRootState) =>
  homePage.selected;

export const selectWikiLoading = ({ homePage }: ApplicationRootState) =>
  homePage.selectedLoading;
