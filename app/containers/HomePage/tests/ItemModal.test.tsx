// tslint:disable:jsx-wrap-multiline
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import ItemModal from '../ItemModal';
import { Provider } from 'react-redux';
import configureStore from 'configureStore';
import history from 'utils/history';
import ItemPage from '../ItemPage';
import * as selectors from '../selectors';
import * as actions from '../actions';

jest.mock('../ItemPage', () => () => null);

jest.mock('../selectors');
const testMovie = {
  id: 'id',
  title: 'title',
  year: '2020',
  image: 'image',
  type: 'movie',
};
describe('<ItemModal />', () => {
  jest.spyOn(selectors, 'selectSelectedItem').mockReturnValue(testMovie);
  it('should display modal', async () => {
    const { findByTestId } = render(
      <Provider store={configureStore({}, history)}>
        <ItemModal />
      </Provider>,
    );
    await waitFor(() => findByTestId('HomePage-ItemModal-Modal'));
  });
});
