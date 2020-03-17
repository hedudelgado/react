import React from 'react';
import { shallow } from 'enzyme';
import { DEFAULT_VIEW, ROOM_REQUIREMENTS_VIEW } from '../../App/appActions';
import RoomRequirements from '../RoomRequirements';

describe('RoomRequirements Component', () => {
  let wrapper;

  const props = {
    dictionary: {
      'roomrequirements.title': 'Room Requirements',
      'roomrequirements.description': 'You can save your room requirements here so they are pre-selected in your future bookings (these only apply when you are making bookings for yourself)',
      'roomrequirements.button.edit': 'Edit room requirements',
      'roomrequirements.notification.success': 'Your details have been updated successfully!',
    },
    app: { roomRequirementsEditView: false },
    setEditView: jest.fn(),
    setNotificationMessage: jest.fn(),
  };

  beforeEach(() => {
    wrapper = shallow(<RoomRequirements {...props} />);
  });

  describe('Renders RoomRequirements Component Elements', () => {
    it('should render the component', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should trigger setEditView when clicking the edit room requirements button', () => {
      wrapper.find('[data-test="edit-roomrequirements"]').simulate('click');
      expect(props.setEditView).toHaveBeenCalledTimes(1);
      expect(props.setNotificationMessage).toHaveBeenCalledTimes(1);
    });

    it('should show success message when room requirements updated successfully', () => {
      const copyProps = {
        ...props,
        app: { editViewName: DEFAULT_VIEW, notificationMessage: ROOM_REQUIREMENTS_VIEW },
      };
      wrapper = shallow(<RoomRequirements {...copyProps} />);
      expect(wrapper).toContainExactlyOneMatchingElement('[data-test="success-message"]');
    });
  });
});
