import React from 'react';
import { shallow } from 'enzyme';
import PasswordForm from '../PasswordForm';

describe('PasswordForm component', () => {
  let wrapper;
  const props = {
    dictionary: {
      'password.button.update': 'Update Password',
      'password.button.cancel': 'Cancel password update',
    },
    errors: {},
    touched: {},
    handleSubmit: jest.fn(),
    setEditView: jest.fn(),
    handleChange: jest.fn(),
    handleBlur: jest.fn(),
  };

  beforeEach(() => {
    wrapper = shallow(<PasswordForm {...props} />);
  });

  describe('renders the component elements', () => {
    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('follows the business logic', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should go back to default view on Cancel', () => {
      wrapper.find('[data-test="closeForm"]').simulate('click');
      expect(props.setEditView).toHaveBeenCalled();
    });

    it('should submit the form', () => {
      wrapper.find('[name="password-form"]').simulate('submit');
      expect(props.handleSubmit).toHaveBeenCalledTimes(1);
    });

    it('should call the blur function on field Blur event', () => {
      wrapper.find('[name="currentPassword"]').simulate('blur');
      wrapper.find('[name="newPassword"]').simulate('blur');
      wrapper.find('[name="confirmPassword"]').simulate('blur');

      expect(props.handleBlur).toHaveBeenCalledTimes(3);
      expect(props.handleChange).toHaveBeenCalledTimes(0);
    });

    it('should call the change function on field Change event', () => {
      wrapper.find('[name="currentPassword"]').simulate('change');
      wrapper.find('[name="newPassword"]').simulate('change');
      wrapper.find('[name="confirmPassword"]').simulate('change');

      expect(props.handleBlur).toHaveBeenCalledTimes(0);
      expect(props.handleChange).toHaveBeenCalledTimes(3);
    });
  });
});
