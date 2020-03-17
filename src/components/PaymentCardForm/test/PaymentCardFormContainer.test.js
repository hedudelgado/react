import React from 'react';
import { when } from 'jest-when';
import { mount, shallow } from 'enzyme';
import PaymentCardFormContainer from '../PaymentCardFormContainer';
import { validateBin } from '../../../utils/api';
import {
  validateFullName,
  validateExpiryDate,
  validateCardNumber,
  validatePostCode,
  validateCompanyName,
  validateAddressLine,
} from '../../../utils/validations';
import {
  DEFAULT_VIEW,
  PAYMENT_CARD_ERROR,
  PAYMENT_CARD_VIEW,
} from '../../App/appActions';

jest.mock('../../../utils/validations', () => ({
  __esModule: true,
  validateFullName: jest.fn(),
  validateExpiryDate: jest.fn(),
  validateCardNumber: jest.fn(),
  validatePostCode: jest.fn(),
  validateCompanyName: jest.fn(),
  validateAddressLine: jest.fn(),
}));

jest.mock('../../../utils/session-storage', () => ({
  __esModule: true,
  getJsonItem: () => ({
    domain: 'https://www.premierinn.com',
  }),
}));

jest.mock('../../../utils/api', () => ({
  __esModule: true,
  validateBin: jest.fn(() => Promise.resolve({
    cardType: 'VI',
    cardLegend: 'Visa Credit',
    startDateRequired: false,
    issueNumberRequired: false,
    cardFeeApplies: false,
    cardFeeAmount: null,
  })),
}));

describe('PaymentCardFormContainer Component', () => {
  let props;
  let wrapper;
  const updateProfile = jest.fn(() => Promise.resolve({}));

  beforeEach(() => {
    props = {
      updateProfile,
      profile: {
        contactDetail: {
          address: {
            postCode: 'EC1N 2TD',
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
        bookingPreference: {
          roomRequirements: {
            type: 'DB',
            adults: 1,
            children: 0,
            cotRequired: false,
            hotelBrand: 'PI',
          },
          foodPreference: 11,
          wantSmsConfirmations: false,
        },
      },
      dictionary: {
        'payment.add.title': 'Add payment card',
        'payment.add.name': "Cardholder's name",
        'payment.add.number': 'Card number',
        'payment.add.date': 'Expiry date',
        'payment.add.address.same': 'Use personal address',
        'payment.add.address.different': 'Use different address',
        'payment.add.prepay': 'I want to be able to prepay with my saved card to save time when checking in. Prepayment is not available at all Premier Inn hotels and sometimes you’ll need to pay when you check in.',
        'payment.add.save': 'Save card',
        'payment.add.cancel': 'Cancel changes',
        'generic.error': 'Oops, something went wrong!',
        'profile.button.findpostcode': 'Find new address',
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
      setNotificationMessage: jest.fn(),
      updateProfileStore: jest.fn(),
      app: {},
    };
    jest.clearAllMocks();
    wrapper = mount(<PaymentCardFormContainer {...props} />);
  });

  describe('Renders PaymentCardFormContainer Component', () => {
    it('should render the component', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should trigger setEditView and setNotificationMessage when user clicks cancel', () => {
      wrapper
        .find('[data-test="closeForm"]')
        .simulate('click');
      expect(props.setEditView).toHaveBeenCalledTimes(1);
      expect(props.setNotificationMessage).toHaveBeenCalledTimes(1);
    });

    it('should show the Payment Card images section', () => {
      expect(wrapper.find('BaseStyle[data-test="payment-cards"]')).toHaveLength(1);
    });

    it('should show 9 cards', () => {
      const images = wrapper
        .find('img');
      expect(images).toHaveLength(9);
    });

    it('should disable the Month field label when the user selects a valid month', () => {
      wrapper.instance().validateExpiryDate('year', 3);
      expect(wrapper.state().disableSelectDefaults.month).toBe(true);
    });

    it('should disable the Month field label when the user selects a valid year', () => {
      wrapper.instance().validateExpiryDate(2030, 'month');
      expect(wrapper.state().disableSelectDefaults.year).toBe(true);
    });

    it('should show Address form when user selects option to use a different address', () => {
      wrapper
        .find('#useBillingAddress')
        .hostNodes()
        .simulate('change');
      expect(wrapper).toContainExactlyOneMatchingElement('AddressForm');
    });

    it('should display error notification', () => {
      const newProps = {
        ...props,
        app: { notificationMessage: PAYMENT_CARD_ERROR },
      };
      wrapper = shallow(<PaymentCardFormContainer {...newProps} />);
      expect(wrapper.find('[data-test="error-notification"]')).toHaveLength(1);
    });
  });

  describe('Payment Card Form validations', () => {
    it('should validate all fields calling all validation functions with the correct values', () => {
      const values = {
        cardNumber: '4444333322221111',
        cardHolderName: 'Test Card',
        expiryMonth: 1,
        expiryYear: 2020,
        usePersonalAddress: 'true',
      };

      wrapper
        .find('[data-test="payment-card-form-wrapper"]')
        .props()
        .validate(values);

      expect(validateFullName).toHaveBeenCalledWith('Test Card');
      expect(validateCardNumber).toHaveBeenCalledWith('4444333322221111');
      expect(validateExpiryDate).toHaveBeenCalledWith(2020, 1);
    });

    it('should pass all validation and not display any error messages', () => {
      const values = {
        cardNumber: '4444333322221111',
        cardHolderName: 'Test Card',
        expiryMonth: 1,
        expiryYear: 2020,
        usePersonalAddress: 'false',
        line1: '120 Holborn',
        line2: 'Whitbread Digital',
        line3: 'Floor 1',
        line4: 'London',
        postCode: 'EC1N 2TD',
        countryCode: 'GB',
        type: 'BUSINESS',
        companyName: 'Whitbread PLC',
      };

      validateExpiryDate.mockImplementationOnce(() => undefined);

      const validationResult = wrapper
        .find('[data-test="payment-card-form-wrapper"]')
        .props()
        .validate(values);

      expect(validationResult).toEqual({
        cardNumber: undefined,
        cardHolderName: undefined,
        expiryMonth: undefined,
        expiryYear: undefined,
        line1: undefined,
        line2: undefined,
        line3: undefined,
        line4: undefined,
        postCode: undefined,
        countryCode: undefined,
        type: undefined,
        companyName: undefined,
      });
    });

    it('should return the error messages based on incorrect values', () => {
      const values = {
        cardNumber: '444433332222111!',
        cardHolderName: '',
        expiryMonth: 1,
        expiryYear: 2019,
        usePersonalAddress: 'false',
        line1: '120 Holborn',
        line2: 'Whitbread Digital',
        line3: 'Floor 1',
        line4: 'London',
        postCode: 'EC1N 2TD',
        countryCode: 'GB',
        type: 'BUSINESS',
        companyName: 'Whitbread PLC',
      };

      validateFullName.mockImplementationOnce(() => 'Please enter a valid full name');
      validateCardNumber.mockImplementationOnce(() => 'Please enter a card number');
      validateExpiryDate.mockImplementationOnce(() => 'Please enter a valid expiry date');
      validatePostCode.mockImplementationOnce(() => 'Please enter valid postcode');
      validateCompanyName.mockImplementationOnce(() => 'Please enter valid Company name');

      when(validateAddressLine).calledWith(values.line1, true).mockReturnValue('Address contains illegal characters');
      when(validateAddressLine).calledWith(values.line2, false).mockReturnValue('Address contains illegal characters');
      when(validateAddressLine).calledWith(values.line3, false).mockReturnValue('Address contains illegal characters');
      when(validateAddressLine).calledWith(values.line4, false).mockReturnValue('Address contains illegal characters');

      const validationResult = wrapper
        .find('[data-test="payment-card-form-wrapper"]')
        .props()
        .validate(values);

      expect(validationResult).toEqual({
        cardHolderName: 'Please enter a valid full name',
        cardNumber: 'Please enter a card number',
        expiryMonth: 'Please enter a valid expiry date',
        expiryYear: 'Please enter a valid expiry date',
        line1: 'Address contains illegal characters',
        line2: 'Address contains illegal characters',
        line3: 'Address contains illegal characters',
        line4: 'Address contains illegal characters',
        postCode: 'Please enter valid postcode',
        companyName: 'Please enter valid Company name',
      });
    });
  });

  describe('PaymentCardFormContainer handlers', () => {
    it('should add card logo on cardNumber blur', async () => {
      validateCardNumber.mockImplementationOnce(jest.fn(() => undefined));
      wrapper
        .find('input[name="cardNumber"]')
        .hostNodes()
        .simulate('blur');
      await Promise.all([validateBin]).then(() => {
        wrapper.update();
        expect(wrapper).toContainExactlyOneMatchingElement('img[alt="Visa Credit"].card-logo');
      });
    });

    it('should remove card logo on blur if cardNumber is invalid', () => {
      validateCardNumber.mockImplementationOnce(jest.fn(() => 'error'));
      wrapper
        .find('input[name="cardNumber"]')
        .hostNodes()
        .simulate('blur');
      wrapper.update();
      expect(wrapper).not.toContain('img.card-logo');
    });

    it('should set ERROR notification on generic api failure', async () => {
      updateProfile.mockImplementationOnce(jest.fn(() => Promise.reject({})));
      const values = {
        cardNumber: '4444333322221111',
        cardHolderName: 'test',
        expiryMonth: '1',
        expiryYear: '2019',
        prePayment: true,
      };
      wrapper.instance().handleSubmit(values, {});
      await Promise.all([updateProfile]).then(() => {
        expect(props.setNotificationMessage)
          .toHaveBeenCalledTimes(1)
          .toHaveBeenCalledWith(PAYMENT_CARD_ERROR);
        expect(props.updateProfileStore).not.toHaveBeenCalled();
      });
    });

    it('should submit new card details', async () => {
      const values = {
        cardNumber: '4444333322221111',
        cardHolderName: 'test',
        expiryMonth: '1',
        expiryYear: '2019',
        prePayment: true,
      };
      const actions = { setSubmitting: jest.fn() };
      wrapper.instance().handleSubmit(values, actions);
      await Promise.all([updateProfile]).then(() => {
        expect(props.setNotificationMessage)
          .toHaveBeenCalledTimes(1)
          .toHaveBeenCalledWith(PAYMENT_CARD_VIEW);
        expect(props.setEditView)
          .toHaveBeenCalledTimes(1)
          .toHaveBeenCalledWith(DEFAULT_VIEW);
        expect(actions.setSubmitting)
          .toHaveBeenCalledTimes(1)
          .toHaveBeenCalledWith(false);
        expect(props.updateProfileStore)
          .toHaveBeenCalledTimes(1)
          .toHaveBeenCalledWith({
            bookingPreference: {
              foodPreference: 11,
              prepay: true,
              roomRequirements: {
                adults: 1, children: 0, cotRequired: false, hotelBrand: 'PI', type: 'DB',
              },
              wantSmsConfirmations: false,
            },
            contactDetail: { address: { postCode: 'EC1N 2TD' } },
            paymentPreference: {
              electronicInvoiceRequired: true,
              paymentCard: {
                cardHolderName: 'test', cardNumber: '************1111', cardType: '', expiryDate: '01/19',
              },
            },
          });
      });
    });

    it('should submit new card details with business billing address', async () => {
      const values = {
        cardNumber: '4444333322221111',
        cardHolderName: 'test',
        expiryMonth: '1',
        expiryYear: '2019',
        prePayment: true,
        usePersonalAddress: 'false',
        line1: 'line1 test',
        line2: 'line2 test',
        line3: 'line3 test',
        line4: 'line4 test',
        postCode: 'postCode test',
        countryCode: 'countryCode test',
        type: 'BUSINESS',
        companyName: 'companyName test',
      };
      const actions = { setSubmitting: jest.fn() };
      wrapper.instance().handleSubmit(values, actions);
      await Promise.all([updateProfile]).then(() => {
        expect(props.setNotificationMessage)
          .toHaveBeenCalledTimes(1)
          .toHaveBeenCalledWith(PAYMENT_CARD_VIEW);
        expect(props.setEditView)
          .toHaveBeenCalledTimes(1)
          .toHaveBeenCalledWith(DEFAULT_VIEW);
        expect(actions.setSubmitting)
          .toHaveBeenCalledTimes(1)
          .toHaveBeenCalledWith(false);
        expect(props.updateProfileStore)
          .toHaveBeenCalledTimes(1)
          .toHaveBeenCalledWith({
            bookingPreference: {
              foodPreference: 11,
              prepay: true,
              roomRequirements: {
                adults: 1, children: 0, cotRequired: false, hotelBrand: 'PI', type: 'DB',
              },
              wantSmsConfirmations: false,
            },
            contactDetail: { address: { postCode: 'EC1N 2TD' } },
            paymentPreference: {
              electronicInvoiceRequired: true,
              paymentCard: {
                billingAddress: {
                  companyName: 'companyName test',
                  countryCode: 'countryCode test',
                  line1: 'line1 test',
                  line2: 'line2 test',
                  line3: 'line3 test',
                  line4: 'line4 test',
                  postCode: 'postCode test',
                  type: 'BUSINESS',
                },
                cardHolderName: 'test',
                cardNumber: '************1111',
                cardType: '',
                expiryDate: '01/19',
              },
            },
          });
      });
    });

    it('should submit new card details with non business billing address', async () => {
      const values = {
        cardNumber: '4444333322221111',
        cardHolderName: 'test',
        expiryMonth: '12',
        expiryYear: '2019',
        prePayment: true,
        usePersonalAddress: 'false',
        line1: 'line1 test',
        line2: 'line2 test',
        line3: 'line3 test',
        line4: 'line4 test',
        postCode: 'postCode test',
        countryCode: 'countryCode test',
        type: 'HOME',
      };
      const actions = { setSubmitting: jest.fn() };
      wrapper.instance().handleSubmit(values, actions);
      await Promise.all([updateProfile]).then(() => {
        expect(props.setNotificationMessage)
          .toHaveBeenCalledTimes(1)
          .toHaveBeenCalledWith(PAYMENT_CARD_VIEW);
        expect(props.setEditView)
          .toHaveBeenCalledTimes(1)
          .toHaveBeenCalledWith(DEFAULT_VIEW);
        expect(actions.setSubmitting)
          .toHaveBeenCalledTimes(1)
          .toHaveBeenCalledWith(false);
        expect(props.updateProfileStore)
          .toHaveBeenCalledTimes(1)
          .toHaveBeenCalledWith({
            bookingPreference: {
              foodPreference: 11,
              prepay: true,
              roomRequirements: {
                adults: 1, children: 0, cotRequired: false, hotelBrand: 'PI', type: 'DB',
              },
              wantSmsConfirmations: false,
            },
            contactDetail: { address: { postCode: 'EC1N 2TD' } },
            paymentPreference: {
              electronicInvoiceRequired: true,
              paymentCard: {
                billingAddress: {
                  countryCode: 'countryCode test',
                  line1: 'line1 test',
                  line2: 'line2 test',
                  line3: 'line3 test',
                  line4: 'line4 test',
                  postCode: 'postCode test',
                  companyName: null,
                  type: 'HOME',
                },
                cardHolderName: 'test',
                cardNumber: '************1111',
                cardType: '',
                expiryDate: '12/19',
              },
            },
          });
      });
    });

    it('should submit new card details with the correct expiry date format', async () => {
      const values = {
        cardNumber: '4444333322221111',
        cardHolderName: 'test',
        expiryMonth: '10',
        expiryYear: '2025',
        prePayment: true,
      };
      const actions = { setSubmitting: jest.fn() };
      wrapper.instance().handleSubmit(values, actions);
      await Promise.all([updateProfile]).then(() => {
        expect(props.setNotificationMessage)
          .toHaveBeenCalledTimes(1)
          .toHaveBeenCalledWith(PAYMENT_CARD_VIEW);
        expect(props.setEditView)
          .toHaveBeenCalledTimes(1)
          .toHaveBeenCalledWith(DEFAULT_VIEW);
        expect(actions.setSubmitting)
          .toHaveBeenCalledTimes(1)
          .toHaveBeenCalledWith(false);
        expect(props.updateProfileStore)
          .toHaveBeenCalledTimes(1)
          .toHaveBeenCalledWith({
            bookingPreference: {
              foodPreference: 11,
              prepay: true,
              roomRequirements: {
                adults: 1, children: 0, cotRequired: false, hotelBrand: 'PI', type: 'DB',
              },
              wantSmsConfirmations: false,
            },
            contactDetail: { address: { postCode: 'EC1N 2TD' } },
            paymentPreference: {
              electronicInvoiceRequired: true,
              paymentCard: {
                cardHolderName: 'test', cardNumber: '************1111', cardType: '', expiryDate: '10/25',
              },
            },
          });
      });
    });
  });
});
