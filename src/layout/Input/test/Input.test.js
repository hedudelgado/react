import React from 'react';
import { shallow } from 'enzyme';

import Input from '../Input';

describe('Input Component', () => {
  const props = {
    id: 'test',
    type: 'text',
    placeholder: 'Placeholder',
    value: 'value',
    label: 'Label',
    touched: true,
  };

  it('should render the component', () => {
    const wrapper = shallow(<Input {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should not render label if not set', () => {
    const wrapper = shallow(<Input {...{ ...props, label: null }} />);
    expect(wrapper).not.toContainMatchingElement('label');
  });

  it('should render the error if set', () => {
    const wrapper = shallow(<Input {...{ ...props, error: 'error message' }} />);
    expect(wrapper).toContainMatchingElement('.error-field');
    expect(wrapper).toContainMatchingElement('.form-item-msg--error');
    expect(wrapper.find('.form-item-msg--error')).toHaveText('error message');
  });

  it('should set sessioncamhide class if set', () => {
    const wrapper = shallow(<Input {...{ ...props, sessioncamhide: true }} />);
    expect(wrapper.find('input')).toHaveClassName('sessioncamhidetext');
  });
});
