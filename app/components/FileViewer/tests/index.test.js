import React from 'react';
import { mount } from 'enzyme';

import FileViewer from '../index';

describe('<FileViewer />', () => {
  it('should have a className', () => {
    const renderedComponent = mount(<FileViewer className="test" />);
    expect(renderedComponent.find('li').prop('className')).toBeDefined();
  });

  it('should render the content passed to it', () => {
    const content = <div>Hello world!</div>;
    const renderedComponent = mount(<FileViewer item={content} />);
    expect(renderedComponent.contains(content)).toBe(true);
  });
});
