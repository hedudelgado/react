import React from 'react';
import { shallow } from 'enzyme';
import Icon from '..';

describe('Icon component', () => {
  it('should render as expected', () => {
    expect(shallow(<Icon icon="foo" push="right" />)).toMatchSnapshot();
  });

  it('should not have padding if push prop is undefined', () => {
    const wrapper = shallow(<Icon icon="foo" />);

    expect(wrapper).not.toHaveProp('push');
    expect(wrapper).not.toHaveClassName('pl1');
    expect(wrapper).not.toHaveClassName('pr1');
  });

  it('should have padding if push prop is set', () => {
    expect(shallow(<Icon icon="foo" push="left" />)).toHaveClassName('pl1');
    expect(shallow(<Icon icon="foo" push="right" />)).toHaveClassName('pr1');
  });
});
