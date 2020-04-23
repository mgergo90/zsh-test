import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import { Provider } from 'react-redux';

import HomePage from '../index';

const renderer = createRenderer();

describe('<HomePage />', () => {
  const mockStore = configureMockStore();
  it('should render and match the snapshot', () => {
    renderer.render(
      // tslint:disable-next-line:jsx-wrap-multiline
      <Provider store={mockStore({ data: '' })}>
        <HomePage />
      </Provider>,
    );
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
