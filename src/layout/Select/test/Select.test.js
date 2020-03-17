import React from 'react';
import { shallow } from 'enzyme';

import Select from '../Select';

describe('Select Component', () => {
  const props = {
    id: 'test',
    type: 'text',
    placeholder: 'Placeholder',
    value: 'value',
    label: 'Label',
    touched: true,
  };

  it('should render the component', () => {
    const wrapper = shallow(<Select {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should not render label if not set', () => {
    const wrapper = shallow(<Select {...{ ...props, label: null }} />);
    expect(wrapper).not.toContainMatchingElement('label');
  });

  it('should render the error if set', () => {
    const wrapper = shallow(<Select {...{ ...props, error: 'error message' }} />);
    expect(wrapper).toContainMatchingElement('.error-field');
    expect(wrapper).toContainMatchingElement('.form-item-msg--error');
    expect(wrapper.find('.form-item-msg--error')).toHaveText('error message');
  });

  it('should set sessioncamhide class if set', () => {
    const wrapper = shallow(<Select {...{ ...props, sessioncamhide: true }} />);
    expect(wrapper.find('select')).toHaveClassName('sessioncamhidetext');
  });

  it('should show flagImg when variable is set', () => {
    const wrapper = shallow(<Select {...{ ...props, sessioncamhide: true, flagImg: 'flagImg' }} />);
    expect(wrapper.find('.wb-native-dropdown--flag')).toHaveLength(1);
  });
});
