import React from 'react';
import { shallow } from 'enzyme';
import UserProfileForm from '../UserProfileForm';
import { DEFAULT_VIEW } from '../../App/appActions';

describe('UserProfileForm Component', () => {
  let wrapper;

  const props = {
    dictionary: {
      'profile.form.guesttitle.list': 'Mr,Mrs,Ms,Miss,Master,Dr,Lord,Lady,Sir,Col,Prof,Rev',
    },
    profile: {
      contactDetail: {
        title: 'Miss',
        firstName: 'Test',
        lastName: 'testing',
        email: 'test@whitbread.com',
        telephone: '11111111111',
        mobile: '+4900000000000',
        nationality: 'GB',
        passport: {
          number: '',
          countryOfIssue: '',
        },
        carRegistration: '',
        address: {
          line1: 'Random house',
          line2: 'Random street',
          line3: '',
          line4: 'LONDON',
          postCode: 'EC1N 3TD',
          countryCode: 'D',
          type: 'HOME',
          companyName: '',
        },
      },
    },
    application: {},
    touched: {},
    values: {
      dialingCountryCode: 'GB',
    },
    errors: {},
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
      {
        countryCode: 'TEST',
        countryCodeISO: 'TEST',
        countryLegend: 'Test',
        passportRequired: true,
        dialingCode: '+499',
        flagImg: 'test.png',
      },
    ],
    setEditView: jest.fn(),
    handleBlur: jest.fn(),
    handleChange: jest.fn(),
    setFieldValue: jest.fn(),
    handleSubmit: jest.fn(),
  };

  beforeEach(() => {
    wrapper = shallow(<UserProfileForm {...props} />);
  });

  describe('Renders User Profile Form Component Elements', () => {
    it('should render the component', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should go back to default view on Cancel', () => {
      wrapper.find('[data-test="closeForm"]').simulate('click');
      expect(props.setEditView).toHaveBeenCalledWith(DEFAULT_VIEW);
    });
  });
});
