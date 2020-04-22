import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { render, fireEvent, screen } from '@testing-library/react';

import AppBar from '../';

const renderer = createRenderer();

describe('<AppBar />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(<AppBar onChange={jest.fn()} />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
  it('should call onchange', () => {
    const onChange = jest.fn();
    const event = {
      target: { value: 'find movie' },
    };
    render(<AppBar onChange={onChange} />);
    fireEvent.change(screen.getByPlaceholderText('Search…'), event);
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
