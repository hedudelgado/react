import React from 'react';
import { shallow } from 'enzyme';
import ExtrasPreferencesForm from '../ExtrasPreferencesForm';
import { DEFAULT_VIEW } from '../../App/appActions';

describe('ExtrasPreferencesForm Component', () => {
  let wrapper;

  const props = {
    profile: {
      sessionId: 'zdiKE1MflNUmdXAS',
      contactDetail: {
        title: 'Mrs',
        firstName: 'Test',
        lastName: 'Test',
        email: 'test@whitbread.com',
        telephone: '111111111',
        mobile: '+351222222222',
        nationality: 'GB',
        passport: {
          number: '',
          countryOfIssue: '',
        },
        carRegistration: '',
        address: {
          line1: '120 Holborn',
          line2: '',
          line3: '',
          line4: 'LONDON',
          line5: '',
          postCode: 'EC1N 2TD',
          countryCode: 'GB',
          type: 'BUSINESS',
          companyName: 'Whitbread',
        },
      },
      paymentPreference: {
        electronicInvoiceRequired: true,
        paymentCard: {
          cardType: 'VI',
          cardNumber: '************1111',
          expiryDate: '07/23',
          cardHolderName: 'dwa',
        },
      },
      additionalGuests: [
        {
          title: 'Mr',
          firstName: 'Mac',
          lastName: 'Donalds',
          email: 'mac@test.com',
          telephone: '1111111111',
          mobile: '+441111111111',
          nationality: 'RP',
          carRegistration: '',
        },
      ],
      bookingPreference: {
        roomRequirements: {
          type: 'DB',
          adults: 2,
          children: 0,
          cotRequired: false,
          hotelBrand: 'PI',
        },
        foodPreference: 11,
        wantSmsConfirmations: false,
      },
      companyName: 'Pareto Law',
      companyId: '',
      businessUse: false,
      guestHistoryNumber: 'G14187551',
    },
    dictionary: {
      'extraspreferences.button.cancel': 'Cancel changes',
      'extraspreferences.button.save': 'Save changes',
      'mealoptions.pibreakfast': 'Premier Inn Breakfast',
      'mealoptions.continentalbreakfast': 'Continental Breakfast',
      'mealoptions.mealdeal': 'Meal Deal',
      'mealoptions.nomeals': 'No Meals',
    },
    values: {
      mealOptions: '17',
    },
    setEditView: jest.fn(),
    handleSubmit: jest.fn(),
    handleChange: jest.fn(),
    handleBlur: jest.fn(),
  };

  beforeEach(() => {
    wrapper = shallow(<ExtrasPreferencesForm {...props} />);
  });

  describe('Renders ExtrasPreferencesForm Component Elements', () => {
    it('should render the component', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should return to Extras Preferences default view when changes are cancelled', () => {
      wrapper.find('[data-test="closeForm"]').simulate('click');
      expect(props.setEditView).toHaveBeenCalledWith(DEFAULT_VIEW);
    });

    it('should not show extras wifi preferences if I am a leisure customer', () => {
      expect(wrapper.find('[data-test="extraspreferences-wifi"]')).toHaveLength(0);
    });

    it('should show the extras wifi preferences if I am a business customer', () => {
      const newProps = {
        ...props,
        profile: {
          ...props.profile,
          business: {
            accessLevel: 'SUPER',
          },
        },
      };
      wrapper = shallow(<ExtrasPreferencesForm {...newProps} />);
      expect(wrapper.find('[data-test="extraspreferences-wifi"]')).toHaveLength(1);
    });
  });
});
