import React from 'react';
import { shallow } from 'enzyme';

import Img from '../Img';

describe('Img Component', () => {
  describe('Renders Img Element', () => {
    it('should render the component', () => {
      const wrapper = shallow(<Img src="test" label="test" />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
