import React from 'react';
import { shallow } from 'enzyme';

import Button from '../Button';

describe('Button Component', () => {
  const text = 'text';

  describe('Button Element', () => {
    describe('default', () => {
      it('should show the component', () => {
        const onChange = jest.fn();
        const wrapper = shallow(<Button color="secondary" onClick={onChange}>{text}</Button>);
        expect(wrapper).toContainMatchingElement('button');
        expect(wrapper.find('button')).toHaveText(text);
        wrapper.find('button').simulate('click');
        expect(onChange).toHaveBeenCalled();
      });
      it('should defaulted OnClick', () => {
        const result = Button.defaultProps.onClick();
        expect(result).toBe(undefined);
      });
    });
    describe('Colors', () => {
      it.each([
        ['primary'],
        ['secondary'],
        ['tertiary'],
        ['quaternary'],
        ['default'],
      ])('should render %s button', (color) => {
        const wrapper = shallow(<Button color={color}>test</Button>);
        expect(wrapper.find('button')).toHaveClassName(`wb-btn--${color}`);
      });
    });

    it('should render full width button', () => {
      const wrapper = shallow(<Button fullWidth color="secondary">{text}</Button>);
      expect(wrapper.find('button')).toHaveClassName('wb-btn--full-width');
    });
    it('should not render button as full width when fullWidth is false', () => {
      const wrapper = shallow(<Button fullWidth={false} color="secondary">{text}</Button>);
      expect(wrapper.find('button')).not.toHaveClassName('wb-btn--full-width');
    });
    it('should render a text button', () => {
      const wrapper = shallow(<Button variant="text" color="red">{text}</Button>);
      expect(wrapper.find('button')).toHaveClassName('wb-text-btn');
    });
    it('should render a red text button', () => {
      const wrapper = shallow(<Button variant="text" color="red">{text}</Button>);
      expect(wrapper.find('button')).toHaveClassName('wb-text-btn--red');
    });
    it('should set disabled attribute and class', () => {
      const wrapper = shallow(<Button disabled color="secondary">{text}</Button>);
      expect(wrapper)
        .toHaveClassName('wb-btn--disabled')
        .toMatchSelector('[disabled]');
    });
    it('should set additional classes', () => {
      const wrapper = shallow(<Button className="more classes" color="secondary">{text}</Button>);
      expect(wrapper).toHaveClassName('more classes');
    });
    it('should render a default text button', () => {
      const wrapper = shallow(<Button variant="text" color="default">{text}</Button>);
      expect(wrapper.find('button')).toHaveClassName('wb-text-btn--default');
    });
    it('should render a button with type attribute button by default', () => {
      const wrapper = shallow(<Button variant="text" color="default">{text}</Button>);
      expect(wrapper.find('button')).toMatchSelector('[type="button"]');
    });
    it('should render a button with type attribute submit', () => {
      const wrapper = shallow(<Button variant="text" color="default" type="submit">{text}</Button>);
      expect(wrapper.find('button')).toMatchSelector('[type="submit"]');
    });
  });

  describe('Renders Link Element', () => {
    const linkURL = 'test';

    it('should render link as secondary button', () => {
      const wrapper = shallow(<Button href={linkURL} color="secondary">{text}</Button>);
      expect(wrapper.find('a[href="test"]')).toHaveClassName('wb-btn--secondary');
    });
    it('should render link as quaternary button', () => {
      const wrapper = shallow(<Button href={linkURL} color="quaternary">{text}</Button>);
      expect(wrapper.find('a[href="test"]')).toHaveClassName('wb-btn--quaternary');
    });
    it('should render link as full width button', () => {
      const wrapper = shallow(<Button fullWidth href={linkURL} color="secondary">{text}</Button>);
      expect(wrapper.find('a[href="test"]')).toHaveClassName('wb-btn--full-width');
    });

    it('should not render link as full width button when fullWidth is false', () => {
      const wrapper = shallow(<Button fullWidth={false} href={linkURL} color="secondary">{text}</Button>);
      expect(wrapper.find('a[href="test"]')).not.toHaveClassName('wb-btn--full-width');
    });
  });
});
