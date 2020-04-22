import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';

import App from '../index';
import { Provider } from 'react-redux';

const renderer = createRenderer();

describe('<App />', () => {
  const mockStore = configureMockStore();
  it('should render and match the snapshot', () => {
    renderer.render(
      // tslint:disable-next-line:jsx-wrap-multiline
      <Provider store={mockStore({ data: '' })}>
        <App />
      </Provider>,
    );
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
