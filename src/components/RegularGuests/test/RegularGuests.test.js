import React from 'react';
import { shallow } from 'enzyme';
import { DEFAULT_VIEW, REGULAR_GUESTS_ERROR, REGULAR_GUESTS_VIEW } from '../../App/appActions';
import RegularGuests from '../RegularGuests';

describe('RegularGuests Component', () => {
  let wrapper;

  const props = {
    profile: {
      additionalGuests: [],
    },
    dictionary: {
      'guests.title': 'Regular Guests',
      'guests.noGuests': 'There are no guests',
      'guests.button.add': 'Add guest',
      'guests.button.cancel': 'Cancel changes',
      'guests.notification.text': 'Your details have been updated successfully!',
    },
    app: {},
    setEditView: jest.fn(),
    hideSuccessMessage: jest.fn(),
    openModal: jest.fn(),
    closeModal: jest.fn(),
    index: 1,
    showEditMode: jest.fn(),
  };

  beforeEach(() => {
    wrapper = shallow(<RegularGuests {...props} />);
  });

  describe('Renders RegularGuests Component Elements', () => {
    it('should render the component', () => {
      expect(wrapper).not.toBeEmptyRender();
    });

    it('should show success message when guests have updated successfully', () => {
      const copyProps = {
        ...props,
        app: { editViewName: DEFAULT_VIEW, notificationMessage: REGULAR_GUESTS_VIEW },
      };
      wrapper = shallow(<RegularGuests {...copyProps} />);
      expect(wrapper).toContainExactlyOneMatchingElement('[data-test="success-message"]');
    });

    it('should show error message when api fails', () => {
      const copyProps = {
        ...props,
        app: { editViewName: DEFAULT_VIEW, notificationMessage: REGULAR_GUESTS_ERROR },
      };
      wrapper = shallow(<RegularGuests {...copyProps} />);
      expect(wrapper).toContainExactlyOneMatchingElement('[data-test="error-notification"]');
    });

    it('should not show the Add Guest Button if the account has the max number of regular guests', () => {
      const fullGuests = {
        ...props,
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
            {
              title: 'Mrs',
              firstName: 'Pizza',
              lastName: 'Hut',
              email: 'ph@test.com',
              telephone: '1111111111',
              mobile: '',
              nationality: 'GB',
              carRegistration: '',
            },
            {
              title: 'Miss',
              firstName: 'Kentucky',
              lastName: 'Fried Chicken',
              email: 'kfc@test.com',
              telephone: '1111111111',
              mobile: '',
              nationality: 'GB',
              carRegistration: '',
            },
            {
              title: 'Mrs',
              firstName: 'Jolibee',
              lastName: 'Chicken',
              email: 'jc@test.com',
              telephone: '1111111111',
              mobile: '',
              nationality: 'GB',
              carRegistration: '',
            },
            {
              title: 'Miss',
              firstName: 'Choo',
              lastName: 'Choo',
              email: 'cc@test.com',
              telephone: '1111111111',
              mobile: '',
              nationality: 'GB',
              carRegistration: '',
            },
          ],
        },
      };

      wrapper = shallow(<RegularGuests {...fullGuests} />);

      expect(wrapper.find('#add-guest')).toHaveLength(0);
    });
  });

  describe('Renders RegularGuests Component Data', () => {
    it('should contain a message if there are no regular guests', () => {
      expect(wrapper).toContainExactlyOneMatchingElement('[data-test="no-guests-message"]');
    });

    it('should have two REGULAR_GUESTS_VIEWs, one for each guest', () => {
      props.profile.additionalGuests = [
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
      ];
      wrapper = shallow(<RegularGuests {...props} />);
      expect(wrapper).toContainMatchingElements(2, '[viewName^="REGULAR_GUESTS_VIEW_"]');
    });

    it('should default to empty array', () => {
      const regularGuestsProps = {
        ...props,
      };

      delete regularGuestsProps.profile.additionalGuests;

      const newRegularGuestsWrapper = shallow(<RegularGuests {...regularGuestsProps} />);
      expect(newRegularGuestsWrapper).toMatchSnapshot();
    });
  });
});
