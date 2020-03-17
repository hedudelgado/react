import React from 'react';
import { shallow } from 'enzyme';
import { DEFAULT_VIEW, USER_DETAILS_VIEW } from '../../App/appActions';
import UserProfile from '../UserProfile';

describe('UserProfile Component', () => {
  let wrapper;

  const props = {
    profile: {
      contactDetail: {
        title: 'Master',
        firstName: 'Luke',
        lastName: 'Ie-Eleven',
        email: 'whit111@mailinator.com',
        telephone: '+44767567657',
        mobile: '+44767567657',
        nationality: 'GB',
        passport: {
          number: '',
          countryOfIssue: '',
        },
        carRegistration: '',
        address: {
          line1: 'Porz Avenue, Houghton Hall Park',
          line2: 'Houghton Regis',
          line3: 'Dunstable',
          line4: 'Bedfordshire',
          line5: '',
          postCode: 'LU5 5XE',
          countryCode: 'GB',
          companyName: 'Whitbread Plc',
        },
      },
    },
    countries: [
      {
        countryCode: 'GB',
        countryCodeISO: 'GB',
        countryLegend: 'United Kingdom (the)',
        passportRequired: false,
        dialingCode: '+44',
        flagImg: '/content/dam/global/flags/United-Kingdom.png',
      },
      {
        countryCode: 'D',
        countryCodeISO: 'DE',
        countryLegend: 'Germany',
        passportRequired: true,
        dialingCode: '+49',
        flagImg: '/content/dam/global/flags/Germany.png',
      },
      {
        countryCode: 'GR',
        countryCodeISO: 'GR',
        countryLegend: 'Greece',
        passportRequired: true,
        dialingCode: '+30',
        flagImg: '/content/dam/global/flags/Greece.png',
      },
    ],
    dictionary: {
      'profile.button.changepassword': 'Change password',
      'profile.button.edit': 'Edit Profile',
      'profile.preview.password': 'Password ************',
      'profile.title': 'Your Profile',
    },
    app: {},
    setEditView: jest.fn(),
    setNotificationMessage: jest.fn(),
  };

  const { contactDetail } = props.profile;

  beforeEach(() => {
    wrapper = shallow(<UserProfile {...props} />);
  });

  describe('Renders UserProfile Component Elements', () => {
    it('should render the component', () => {
      expect(wrapper).not.toBeEmptyRender();
    });

    it('should render the address element', () => {
      expect(wrapper.find('address')).toHaveLength(1);
    });

    it('should render the edit profile button', () => {
      expect(wrapper.find('#edit-profile')).toHaveLength(1);
    });

    it('should trigger setEditView when clicking the change password button', () => {
      wrapper.find('#edit-profile').simulate('click');
      expect(props.setEditView).toHaveBeenCalled();
      expect(props.setNotificationMessage).toHaveBeenCalled();
    });

    it('should show success message when password updated successfully', () => {
      const copyProps = {
        ...props,
        app: { editViewName: DEFAULT_VIEW, notificationMessage: USER_DETAILS_VIEW },
      };
      wrapper = shallow(<UserProfile {...copyProps} />);
      expect(wrapper.find('[data-test="success-notification"]')).toHaveLength(1);
    });
  });

  describe('Renders UserProfile Component Data', () => {
    it('should contain the user\'s full name', () => {
      const fullName = 'Master Luke Ie-Eleven';
      expect(wrapper.contains(fullName)).toEqual(true);
    });

    it('should contain the user\'s phone number', () => {
      expect(wrapper.contains(contactDetail.mobile)).toEqual(true);
    });

    it('should contain the user\'s email', () => {
      expect(wrapper.contains(contactDetail.email)).toEqual(true);
    });

    ['line1', 'line2', 'line3', 'line4'].forEach((key) => {
      it(`should contain the ${key} user's address`, () => {
        expect(wrapper.contains(contactDetail.address[key])).toEqual(true);
      });
    });

    it('should contain the user\'s postcode', () => {
      expect(wrapper.contains(contactDetail.address.postCode)).toEqual(true);
    });

    it('should contain the user\'s country legend', () => {
      const countryLegend = 'United Kingdom (the)';
      expect(wrapper.contains(countryLegend)).toEqual(true);
    });

    it('should contain the user\'s company name', () => {
      expect(wrapper.contains(contactDetail.address.companyName)).toEqual(true);
    });
  });
});
