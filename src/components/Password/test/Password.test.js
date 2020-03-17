import React from 'react';
import { shallow } from 'enzyme';
import { DEFAULT_VIEW, PASSWORD_VIEW } from '../../App/appActions';
import Password from '../Password';

describe('Password Component', () => {
  let wrapper;

  const props = {
    dictionary: {
      'password.preview.password': 'Password ************',
      'password.title': 'Password',
      'password.button.changepassword': 'Change Password',
    },
    setEditView: jest.fn(),
    setNotificationMessage: jest.fn(),
    app: { passwordEditView: false },
  };

  beforeEach(() => {
    wrapper = shallow(<Password {...props} />);
  });

  describe('Password', () => {
    it('should render the component', () => {
      expect(wrapper).not.toBeEmptyRender();
    });

    it('should render the change password button', () => {
      expect(wrapper.find('#change-password')).toHaveLength(1);
    });

    it('should trigger setEditView when clicking the change password button', () => {
      wrapper.find('#change-password').simulate('click');
      expect(props.setEditView).toHaveBeenCalled();
      expect(props.setNotificationMessage).toHaveBeenCalled();
    });

    it('should show success message when password updated successfully', () => {
      const copyProps = {
        ...props,
        app: { editViewName: DEFAULT_VIEW, notificationMessage: PASSWORD_VIEW },
      };
      wrapper = shallow(<Password {...copyProps} />);
      expect(wrapper.find('[data-test="success-message"]')).toHaveLength(1);
    });
  });
});
