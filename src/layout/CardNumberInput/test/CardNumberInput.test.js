import React from 'react';
import { shallow } from 'enzyme';

import CardNumberInput from '../CardNumberInput';

describe('Input Component', () => {
  const props = {
    id: 'test',
    type: 'text',
    placeholder: 'Placeholder',
    value: 'value',
    label: 'Label',
    touched: true,
    field: {
      name: 'test',
    },
  };

  it('should render the component', () => {
    const wrapper = shallow(<CardNumberInput {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should not render label if not set', () => {
    const wrapper = shallow(<CardNumberInput {...{ ...props, label: null }} />);
    expect(wrapper).not.toContainMatchingElement('label');
  });

  it('should render the error if set', () => {
    const wrapper = shallow(<CardNumberInput {...{ ...props, error: 'error message' }} />);
    expect(wrapper).toContainMatchingElement('.error-field');
    expect(wrapper).toContainMatchingElement('.form-item-msg--error');
    expect(wrapper.find('.form-item-msg--error')).toHaveText('error message');
  });

  it('should set sessioncamhide class if set', () => {
    const wrapper = shallow(<CardNumberInput {...{ ...props, sessioncamhide: true }} />);
    expect(wrapper.find('input')).toHaveClassName('sessioncamhidetext');
  });

  it('should add img to input when src is set', () => {
    const wrapper = shallow(<CardNumberInput {...{ ...props, card: { src: 'test.png', alt: 'test' } }} />);
    expect(wrapper).toContainExactlyOneMatchingElement('.card-logo');
  });
});
