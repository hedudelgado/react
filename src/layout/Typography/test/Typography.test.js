import React from 'react';
import { shallow } from 'enzyme';
import Typography from '../Typography';

describe('Typography component', () => {
  describe('Config behaviour', () => {
    it('should extends the component classes', () => {
      const wrapper = shallow(<Typography className="test-class">test</Typography>).find('BaseStyle').dive();
      expect(wrapper)
        .toContainExactlyOneMatchingElement('p')
        .toHaveClassName('test-class');
    });
    it('should add bold font weight', () => {
      const wrapper = shallow(<Typography weight="bold">test</Typography>).find('BaseStyle').dive();
      expect(wrapper)
        .toContainExactlyOneMatchingElement('p')
        .toHaveClassName('wb-strong');
    });

    it('should display children components', () => {
      const wrapper = shallow(<Typography weight="bold"><span>test</span></Typography>).find('BaseStyle').dive();
      expect(wrapper)
        .toContainMatchingElement('p')
        .toContainMatchingElement('span')
        .toIncludeText('test');
    });

    describe('Sizes', () => {
      it.each([
        ['xxxl', 'font-size--xxxl'],
        ['xxl', 'font-size--xxl'],
        ['xl', 'font-size--xl'],
        ['l', 'font-size--l'],
        ['base', 'font-size--base'],
        ['m', 'font-size--m'],
        ['s', 'font-size--s'],
        ['xs', 'font-size--xs'],
      ])('should have %s size', (size, fontSize) => {
        const wrapper = shallow(<Typography size={size}>test</Typography>).find('BaseStyle').dive();
        expect(wrapper)
          .toContainExactlyOneMatchingElement('p')
          .toHaveClassName(fontSize);
      });
    });
  });
  describe('Component variance', () => {
    it('should default to a p', () => {
      const wrapper = shallow(<Typography>test</Typography>).find('BaseStyle').dive();
      expect(wrapper)
        .toContainExactlyOneMatchingElement('p')
        .toHaveClassName('font-size--base');
    });
    describe('Paragraphs', () => {
      it('should display a p', () => {
        const wrapper = shallow(<Typography component="p">test</Typography>).find('BaseStyle').dive();
        expect(wrapper)
          .toContainExactlyOneMatchingElement('p')
          .toHaveClassName('font-size--base');
      });
      it('should display a span', () => {
        const wrapper = shallow(<Typography component="span">test</Typography>).find('BaseStyle').dive();
        expect(wrapper)
          .toContainExactlyOneMatchingElement('span')
          .toHaveClassName('font-size--base');
      });
    });
    describe('Header', () => {
      describe('Size', () => {
        it.each([
          ['hero', 'wb-heading--hero', 'h1'],
          ['h1', 'wb-heading--h1', 'h1'],
          ['h2', 'wb-heading--h2', 'h2'],
          ['h3', 'wb-heading--h3', 'h3'],
          ['h4', 'wb-heading--h4', 'h4'],
          ['h5', 'wb-heading--h5', 'h5'],
          ['h6', 'wb-heading--h6', 'h6'],
          ['subtext', 'wb-heading--subtext', 'h5'],
        ])('should display a %s component', (component, className, header) => {
          const wrapper = shallow(<Typography component={component}>test</Typography>).find('BaseStyle').dive();
          expect(wrapper)
            .toContainExactlyOneMatchingElement(header)
            .toHaveClassName(`wb-heading ${className}`);
        });
      });
    });
  });
});
