import React from 'react';
import { shallow } from 'enzyme';
import RegularGuest from '../RegularGuest';
import { REGULAR_GUESTS_ERROR } from '../../App/appActions';

describe('RegularGuest Component', () => {
  let wrapper;
  const updateProfile = jest.fn(() => Promise.resolve({}));

  const props = {
    updateProfile,
    dictionary: {
      'guests.delete.title': 'Delete regular guest',
      'guests.delete.subtext': 'Are you sure you want to delete this guest?',
      'guests.delete.button.label': 'Delete guests',
      'guests.delete.link': 'Delete guest',
      'guests.edit.button': 'Edit guest',
      'guests.cancel.link': 'Cancel changes',
    },
    profile: {
      additionalGuests: [
        {
          title: 'Mr',
          firstName: 'Mac',
          lastName: 'Donalds',
          email: 'mac@test.com',
          telephone: '1111111111',
          mobile: '',
          nationality: 'GB',
          carRegistration: '',
        },
        {
          title: 'Ms',
          firstName: 'Burger',
          lastName: 'King',
          email: 'bk@test.com',
          telephone: '1111111111',
          mobile: '',
          nationality: 'GB',
          carRegistration: '',
        },
      ],
    },
    title: 'Mr',
    firstName: 'Mac',
    lastName: 'Donalds',
    email: 'mac@test.com',
    index: 1,
    showEditMode: jest.fn(),
    openModal: jest.fn(),
    closeModal: jest.fn(),
    setNotificationMessage: jest.fn(),
    updateProfileStore: jest.fn(),
    setEditView: jest.fn(),
    hideSuccessMessage: jest.fn(),

  };

  const { email, openModal } = props;

  beforeEach(() => {
    wrapper = shallow(<RegularGuest {...props} />);
  });

  describe('Renders RegularGuest Component Elements', () => {
    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render the delete guest button link', () => {
      expect(wrapper.find('#delete-guest-1')).toHaveLength(1);
    });

    it('should render the edit guest button', () => {
      expect(wrapper.find('[data-test="edit-guest-1"]')).toHaveLength(1);
    });

    it('should trigger showEditMode when clicking the edit guest button', () => {
      wrapper.find('[data-test="edit-guest-1"]').simulate('click');
      expect(props.setEditView).toHaveBeenCalledTimes(1);
      expect(props.hideSuccessMessage).toHaveBeenCalledTimes(1);
    });

    it('should open the delete modal on click', () => {
      wrapper.find('#delete-guest-1').simulate('click');
      expect(openModal).toHaveBeenCalled();
    });
  });

  describe('Renders RegularGuest Component Data', () => {
    it('should contain the guest\'s full name', () => {
      const fullName = 'Mr Mac Donalds';
      expect(wrapper.contains(fullName)).toEqual(true);
    });

    it('should contain the guest\'s email', () => {
      expect(wrapper.contains(email)).toEqual(true);
    });
  });

  describe('Delete RegularGuest submission', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should delete a guest', async () => {
      wrapper.instance().deleteGuest();

      await Promise.all([updateProfile]).then(() => {
        expect(props.setNotificationMessage).toHaveBeenCalledTimes(1);
        expect(props.updateProfileStore).toHaveBeenCalledTimes(1);
        expect(props.updateProfileStore).toHaveBeenCalledWith({
          additionalGuests: [
            {
              title: 'Mr',
              firstName: 'Mac',
              lastName: 'Donalds',
              email: 'mac@test.com',
              telephone: '1111111111',
              mobile: '',
              nationality: 'GB',
              carRegistration: '',
            },
          ],
        });
      });

      expect(props.closeModal).toHaveBeenCalledTimes(1);
    });

    it('should show error when api fails', async () => {
      updateProfile.mockImplementationOnce(jest.fn(() => Promise.reject({})));
      wrapper.instance().deleteGuest();

      await Promise.all([updateProfile]).then(() => {
        expect(props.setNotificationMessage)
          .toHaveBeenCalledTimes(1)
          .toHaveBeenCalledWith(REGULAR_GUESTS_ERROR);
        expect(props.updateProfileStore).not.toHaveBeenCalled();
      });
    });
  });
});
