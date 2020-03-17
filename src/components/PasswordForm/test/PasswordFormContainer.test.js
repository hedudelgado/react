import React from 'react';
import { shallow } from 'enzyme';
import PasswordFormContainer from '../PasswordFormContainer';
import { validateCurrentPassword, validateNewPassword, validateConfirmPassword } from '../../../utils/validations';
import { PASSWORD_ERROR } from '../../App/appActions';

jest.mock('../../../utils/validations', () => ({
  __esModule: true,
  validateCurrentPassword: jest.fn(),
  validateNewPassword: jest.fn(),
  validateConfirmPassword: jest.fn(),
}));

describe('PasswordFormContainer Component', () => {
  let wrapper;
  let props;
  const updateProfile = jest.fn(() => Promise.resolve({}));

  beforeEach(() => {
    props = {
      dictionary: {
        'password.button.update': 'Update',
        'password.button.cancel': 'Cancel',
      },
      setEditView: jest.fn(),
      profile: {},
      setNotificationMessage: jest.fn(),
      app: {},
      updateProfile,
    };
    wrapper = shallow(<PasswordFormContainer {...props} />);
  });

  describe('Renders PasswordFormContainer Element', () => {
    it('should render the component', () => {
      expect(wrapper).not.toBeEmptyRender();
    });

    it('should match snapshot', () => {
      expect(wrapper.find('Formik').dive()).toMatchSnapshot();
    });

    it('should display an error message when state.showError is true', () => {
      const newProps = {
        ...props,
        app: { notificationMessage: PASSWORD_ERROR },
      };
      wrapper = shallow(<PasswordFormContainer {...newProps} />);
      expect(wrapper.find('[data-test="error-notification"]')).toHaveLength(1);
    });

    it('should not display an error message when state.showError is false', () => {
      wrapper.setState({ showError: false });
      expect(wrapper.find('[data-test="error"]')).toHaveLength(0);
    });

    it('should execute togglePasswordView when clicking the cancel update button', () => {
      wrapper
        .find('[data-test="password-form-wrapper"]')
        .dive()
        .find('[data-test="password-form"]')
        .props()
        .setEditView();
      expect(props.setEditView).toHaveBeenCalledTimes(1);
    });
  });

  describe('Password Form submission', () => {
    const mockSubmitOptions = (setFieldError = jest.fn(), setSubmitting = jest.fn()) => {
      const submitValues = {
        currentPassword: 'Password1',
        newPassword: 'Password134',
        confirmPassword: 'Password134',
      };
      const submitActions = { setFieldError, setSubmitting };

      wrapper
        .find('[data-test="password-form-wrapper"]')
        .simulate('submit', submitValues, submitActions);
    };

    it('should execute password update success', async () => {
      mockSubmitOptions();

      await Promise.all([updateProfile]).then(() => {
        expect(props.setNotificationMessage).toHaveBeenCalledTimes(1);
      });
    });

    it('should show incorrect password message', async () => {
      const setFieldError = jest.fn();

      updateProfile.mockImplementationOnce(() => Promise.reject({
        code: '012',
        details: ['Existing password doesn\'t match records'],
      }));

      mockSubmitOptions(setFieldError);

      await Promise.all([updateProfile]).then(() => {
        expect(setFieldError).toHaveBeenCalledTimes(1);
      });
    });

    it('should set ERROR notification on generic API failure', async () => {
      updateProfile.mockImplementationOnce(() => Promise.reject({
        code: '999',
        details: ['Bad Request [400]'],
      }));

      mockSubmitOptions();

      await Promise.all([updateProfile]).then(() => {
        expect(props.setNotificationMessage)
          .toHaveBeenCalledTimes(1)
          .toHaveBeenCalledWith(PASSWORD_ERROR);
      });
    });
  });

  describe('Password Form validations', () => {
    const values = {
      currentPassword: 'Premier1',
      newPassword: 'Premier2',
      confirmPassword: 'Premier2',
    };

    it('should validate all fields calling all validation functions with the correct values', () => {
      wrapper
        .find('[data-test="password-form-wrapper"]')
        .props()
        .validate(values);

      expect(validateCurrentPassword).toHaveBeenNthCalledWith(1, 'Premier1');
      expect(validateNewPassword).toHaveBeenNthCalledWith(1, {
        currentPassword: 'Premier1',
        newPassword: 'Premier2',
        confirmPassword: 'Premier2',
      });
      expect(validateConfirmPassword).toHaveBeenNthCalledWith(1, {
        currentPassword: 'Premier1',
        newPassword: 'Premier2',
        confirmPassword: 'Premier2',
      });
    });

    it('should return the correct validation result based on correct values', () => {
      const validationResult = wrapper
        .find('[data-test="password-form-wrapper"]')
        .props()
        .validate(values);

      expect(validationResult).toEqual({
        currentPassword: undefined,
        newPassword: undefined,
        confirmPassword: undefined,
      });
    });

    it('should return the correct validation result based on incorrect values', () => {
      validateCurrentPassword.mockImplementationOnce(() => 'You need to enter your password');
      validateNewPassword.mockImplementationOnce(() => 'Incorrect new password');
      validateConfirmPassword.mockImplementationOnce(() => 'Passwords do not match');

      const validationResult = wrapper
        .find('[data-test="password-form-wrapper"]')
        .props()
        .validate(values);

      expect(validationResult).toEqual({
        currentPassword: 'You need to enter your password',
        newPassword: 'Incorrect new password',
        confirmPassword: 'Passwords do not match',
      });
    });
  });
});
