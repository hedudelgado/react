import React from 'react';
import { shallow } from 'enzyme';

import BaseStyle from '../BaseStyle';

describe('BaseStyle Component', () => {
  describe('Renders BaseStyle Element', () => {
    const spaces = ['0', '1', '2', '3', '4'];
    it('should render the default component', () => {
      const wrapper = shallow(<BaseStyle />);
      expect(wrapper).toContainMatchingElement('div');
    });

    it('should render a specific component', () => {
      const wrapper = shallow(<BaseStyle component="button" />);
      expect(wrapper).toContainMatchingElement('button');
    });

    it('should render additional custom classes', () => {
      const additionalClasses = 'test classTest';
      const wrapper = shallow(<BaseStyle component="button" className={additionalClasses} />);
      expect(wrapper).toHaveClassName(additionalClasses);
    });

    it('should render additional attributes', () => {
      const wrapper = shallow(<BaseStyle component="button" type="submit" data-test />);
      expect(wrapper)
        .toContainMatchingElement('button[type="submit"][data-test]');
    });

    describe('Margins', () => {
      const margins = [
        ['margin', 'm'],
        ['margin-top', 'mt'],
        ['margin-right', 'mr'],
        ['margin-bottom', 'mb'],
        ['margin-left', 'ml'],
        ['margin-left and margin-right', 'mx'],
        ['margin-top and margin-bottom', 'my'],
      ];

      it.each(spaces
        .map(space => margins.map(margin => [...margin, space]))
        .reduce((arr, margin) => [...arr, ...margin], []))('should render %s with %s = %d', (marginStyle, marginProp, space) => {
        const props = {
          [`${marginProp}`]: space,
        };
        const wrapper = shallow(<BaseStyle {...props} />);
        expect(wrapper).toHaveClassName(`${marginProp}${space}`);
      });

      it.each([
        ['margin-right', 'mr'],
        ['margin-left', 'ml'],
        ['margin-left and margin-right', 'mx'],
      ])('should render %s auto', (marginStyle, marginProp) => {
        const props = {
          [`${marginProp}`]: 'auto',
        };
        const wrapper = shallow(<BaseStyle {...props} />);
        expect(wrapper).toHaveClassName(`${marginProp}-auto`);
      });
    });

    describe('Paddings', () => {
      const paddings = [
        ['padding', 'p'],
        ['padding-top', 'pt'],
        ['padding-right', 'pr'],
        ['padding-bottom', 'pb'],
        ['padding-left', 'pl'],
        ['padding-left and padding-right', 'px'],
        ['padding-top and padding-bottom', 'py'],
      ];

      it.each(spaces
        .map(space => paddings.map(padding => [...padding, space]))
        .reduce((arr, padding) => [...arr, ...padding], []))('should render %s with %s = %d', (paddingStyle, paddingProp, space) => {
        const props = {
          [`${paddingProp}`]: space,
        };
        const wrapper = shallow(<BaseStyle {...props} />);
        expect(wrapper).toHaveClassName(`${paddingProp}${space}`);
      });
    });
  });
});
