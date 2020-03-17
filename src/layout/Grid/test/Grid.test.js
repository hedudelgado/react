import React from 'react';
import { shallow, mount } from 'enzyme';

import Grid from '../Grid';
import Col from '../Col';

describe('Grid Component', () => {
  describe('Main Container', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<Grid><Col>test</Col></Grid>);
    });
    it('should render the component', () => {
      expect(wrapper).not.toBeEmptyRender();
      expect(wrapper).toMatchSnapshot();
    });
    it('should render a container', () => {
      expect(wrapper).toHaveClassName('clearfix');
    });
    it('should render borders', () => {
      wrapper = shallow(<Grid border>test</Grid>);
      expect(wrapper).toHaveClassName('border');
    });
  });
  describe('Columns', () => {
    const colSizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

    describe('default behaviour', () => {
      let wrapper;
      beforeEach(() => {
        wrapper = shallow(<Col size="6" key="0">col1</Col>);
      });
      it('should show 1 column', () => {
        expect(wrapper).toContainExactlyOneMatchingElement('.col');
      });
      it.each([
        ...colSizes.map(size => ['default', size, 'size', '']),
        ...colSizes.map(size => ['tablet', size, 'sm', 'sm-']),
        ...colSizes.map(size => ['tablet large', size, 'md', 'md-']),
        ...colSizes.map(size => ['desktop', size, 'lg', 'lg-']),
      ])('should show 1 column with %s breakpoint and size of %s', (breakPoint, size, breakPointType, expectedClass) => {
        const props = {
          [breakPointType]: size,
        };
        wrapper = shallow(<Col {...props}>col1</Col>);
        expect(wrapper).toContainExactlyOneMatchingElement(`.${expectedClass}col-${size}`);
      });
      it('should show multiple breakpoints', () => {
        wrapper = mount(
          <Grid>
            <Col sm="4" lg="6">col1</Col>
            <Col sm="8" lg="6">col2</Col>
          </Grid>,
        );
        expect(wrapper).toContainExactlyOneMatchingElement('BaseStyle.sm-col.sm-col-4.lg-col-6');
        expect(wrapper).toContainExactlyOneMatchingElement('BaseStyle.sm-col.sm-col-8.lg-col-6');
      });

      it('should show base breakpoint class', () => {
        wrapper = mount(
          <Grid>
            <Col md="4" lg="6">col1</Col>
            <Col md="8" lg="6">col2</Col>
          </Grid>,
        );
        expect(wrapper).toContainExactlyOneMatchingElement('BaseStyle.md-col.md-col-4.lg-col-6');
        expect(wrapper).toContainExactlyOneMatchingElement('BaseStyle.md-col.md-col-8.lg-col-6');
      });
    });
  });
});
