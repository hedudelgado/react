import React from 'react';
import { shallow } from 'enzyme';

import Checkbox from '../Checkbox';

describe('Checkbox Component', () => {
  const props = {
    label: 'test',
    field: {},
    id: 'test',
  };

  describe('Renders Checkbox Element', () => {
    it('should render the component', () => {
      const wrapper = shallow(<Checkbox {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
