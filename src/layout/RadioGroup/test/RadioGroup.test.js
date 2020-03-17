import React from 'react';
import { shallow } from 'enzyme';
import RadioGroup from '../RadioGroup';
import RadioItem from '../RadioItem';

describe('RadioGroup Component', () => {
  const children = [
    <RadioItem id="first" key="true" label="test label" name="test" value="true" />,
    <RadioItem id="second" key="false" label="test label" name="test" value="false" />,
  ];
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <RadioGroup>
        {children}
      </RadioGroup>,
    );
  });

  describe('Renders RadioGroup Element', () => {
    it('should render the component', () => {
      expect(wrapper).not.toBeEmptyRender();
      expect(wrapper).toMatchSnapshot();
    });
  });
});
