import React from 'react';
import { shallow } from 'enzyme';
import Hyperlink from '../Hyperlink';

describe('Hyperlink component', () => {
  const variants = ['primary', 'secondary'];

  it('should render the component', () => {
    const props = {
      variant: 'regular',
      href: 'https://www.premierinn.com',
    };
    const wrapper = shallow(<Hyperlink {...props}>This is a hyperlink</Hyperlink>);

    expect(wrapper).toMatchSnapshot();
  });

  it.each(variants)('should render the %s variation', (variant) => {
    const wrapper = shallow(<Hyperlink variant={variant}>This is another link</Hyperlink>);
    expect(wrapper).toHaveClassName(`wb-btn--${variant}`);
  });
});
