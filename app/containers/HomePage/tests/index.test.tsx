// tslint:disable:jsx-wrap-multiline
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import HomePage from '../';
import { Provider } from 'react-redux';
import configureStore from 'configureStore';
import history from 'utils/history';
import * as selectors from 'containers/App/selectors';
import * as homeSelectors from '../selectors';
import * as actions from '../actions';

jest.mock('containers/App/selectors');
jest.mock('../selectors');

describe('<HomePage />', () => {
  jest.spyOn(selectors, 'selectSearchTerm').mockReturnValue('');
  it('should display loading indicator', async () => {
    jest.spyOn(selectors, 'selectError').mockReturnValue('');
    jest.spyOn(homeSelectors, 'selectLoading').mockReturnValue(true);
    jest.spyOn(homeSelectors, 'selectResultsId').mockReturnValueOnce([]);
    const { findByTestId } = render(
      <Provider store={configureStore({}, history)}>
        <HomePage />
      </Provider>,
    );
    await waitFor(() => findByTestId('HomePage-index-progress'));
  });
  it('should display error', async () => {
    jest.spyOn(selectors, 'selectError').mockReturnValue('error');
    jest.spyOn(homeSelectors, 'selectLoading').mockReturnValue(false);
    jest.spyOn(homeSelectors, 'selectResultsId').mockReturnValueOnce([]);
    const { findByTestId } = render(
      <Provider store={configureStore({}, history)}>
        <HomePage />
      </Provider>,
    );
    await waitFor(() => findByTestId('HomePage-index-error'));
  });

  it('should display results', async () => {
    jest.spyOn(selectors, 'selectError').mockReturnValue('');
    jest.spyOn(homeSelectors, 'selectLoading').mockReturnValue(false);
    jest.spyOn(homeSelectors, 'selectResultsId').mockReturnValue([]);
    const { findByTestId } = render(
      <Provider store={configureStore({}, history)}>
        <HomePage />
      </Provider>,
    );
    await waitFor(() => findByTestId('HomePage-index-Grid'));
  });

  it('should call initSearch', () => {
    jest.spyOn(selectors, 'selectSearchTerm').mockReturnValue('term');
    jest.spyOn(selectors, 'selectError').mockReturnValue('');
    jest.spyOn(homeSelectors, 'selectLoading').mockReturnValue(false);
    jest.spyOn(homeSelectors, 'selectResultsId').mockReturnValue([]);
    jest.spyOn(actions, 'initSearch').mockReturnValue(actions.initSearch(''));
    render(
      <Provider store={configureStore({}, history)}>
        <HomePage />
      </Provider>,
    );
    expect(actions.initSearch).toHaveBeenCalledWith('term');
  });
});
