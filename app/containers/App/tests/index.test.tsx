import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import { Provider } from 'react-redux';

import App from '../index';

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
