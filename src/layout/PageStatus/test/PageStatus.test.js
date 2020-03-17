import React from 'react';
import { shallow } from 'enzyme';
import PageStatus from '../PageStatus';

describe('PageStatus component', () => {
  it('should render the warning variant component', () => {
    const props = {
      variant: 'warning',
      ariaLive: 'off',
      title: 'This is a title',
    };
    const wrapper = shallow(<PageStatus {...props}>This is a notification</PageStatus>);

    expect(wrapper).toMatchSnapshot();
  });

  it('should render the error variant component', () => {
    const props = {
      variant: 'error',
      ariaLive: 'off',
      title: 'This is a title',
    };
    const wrapper = shallow(<PageStatus {...props}>This is a notification</PageStatus>);

    expect(wrapper).toMatchSnapshot();
  });
});
