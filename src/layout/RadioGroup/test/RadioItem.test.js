import React from 'react';
import { shallow } from 'enzyme';

import RadioItem from '../RadioItem';

describe('RadioItem Component', () => {
  const props = {
    value: 'true',
    label: 'This is my test label',
    field: {
      name: 'test',
    },
    id: 'test',
    subLabels: [
      'test sub label 1',
      'test sub label 2',
    ],
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<RadioItem {...props} />);
  });

  describe('Renders RadioItem Element', () => {
    it('should render the component', () => {
      expect(wrapper).not.toBeEmptyRender();
      expect(wrapper).toMatchSnapshot();
    });

    it('should have input type radio', () => {
      expect(wrapper).toContainExactlyOneMatchingElement('input[type="radio"]');
    });

    it('should have span label with correct content', () => {
      expect(wrapper).toContainExactlyOneMatchingElement('.wb-radio__label__inner__title');
      expect(wrapper.find('.wb-radio__label__inner__title')).toHaveText('This is my test label');
    });

    it('should have htmlFor property with correct name', () => {
      expect(wrapper).toContainExactlyOneMatchingElement('[htmlFor="test"]');
    });

    it('should have two subLabels', () => {
      expect(wrapper).toContainMatchingElements(2, '.wb-radio__label__inner-info');
    });
  });
});
