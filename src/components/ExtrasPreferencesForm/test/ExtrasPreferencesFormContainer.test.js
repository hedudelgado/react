import React from 'react';
import { shallow } from 'enzyme';
import ExtrasPreferencesFormContainer from '../ExtrasPreferencesFormContainer';
import { EXTRAS_PREFERENCES_ERROR } from '../../App/appActions';

describe('ExtrasPreferences Component', () => {
  let wrapper;
  const updateProfile = jest.fn(() => Promise.resolve({}));

  const props = {
    updateProfile,
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
        electronicInvoiceRequired: 'true',
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
        foodPreference: '11',
        preselectWifi: 'true',
        wantSmsConfirmations: false,
      },
      companyName: 'Pareto Law',
      companyId: '',
      businessUse: false,
      guestHistoryNumber: 'G14187551',
    },
    dictionary: {
      'extraspreferences.edit.title': 'Edit extras preferences',
    },
    setEditView: jest.fn(),
    setNotificationMessage: jest.fn(),
    updateProfileStore: jest.fn(),
    app: {},
  };

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = shallow(<ExtrasPreferencesFormContainer {...props} />);
  });

  describe('Renders ExtrasPreferences Component Elements', () => {
    it('should render the component', () => {
      expect(wrapper.find('Formik').dive()).toMatchSnapshot();
    });

    it('should show error notification', () => {
      const newProps = {
        ...props,
        app: { notificationMessage: EXTRAS_PREFERENCES_ERROR },
      };
      wrapper = shallow(<ExtrasPreferencesFormContainer {...newProps} />);
      expect(wrapper).toContainExactlyOneMatchingElement('[data-test="error-notification"]');
    });
  });

  describe('ExtrasPreferences form submission', () => {
    it('should set ERROR notification on generic api failure', async () => {
      updateProfile.mockImplementationOnce(jest.fn(() => Promise.reject({})));
      const createPayload = jest.fn();

      wrapper.instance().handleSubmit.apply({ props, createPayload }, [{}, {}]);

      await Promise.all([updateProfile]).then(() => {
        expect(props.setNotificationMessage)
          .toHaveBeenCalledTimes(1)
          .toHaveBeenCalledWith(EXTRAS_PREFERENCES_ERROR);
        expect(props.updateProfileStore).not.toHaveBeenCalled();
      });
    });

    it('should generate the correct payload if a meal option is selected', async () => {
      const setSubmitting = jest.fn();
      const createPayload = jest.fn();

      wrapper.instance().handleSubmit.apply({ props, createPayload }, [
        {},
        { setSubmitting },
      ]);

      await Promise.all([updateProfile]).then(() => {
        expect(props.setNotificationMessage).toHaveBeenCalledTimes(1);
        expect(props.setEditView).toHaveBeenCalledTimes(1);
        expect(props.updateProfileStore).toHaveBeenCalledTimes(1);
      });
    });

    it('should generate the correct payload if no meals is selected', async () => {
      const values = {
        mealOptions: '0',
        wifiOptions: 'false',
        invoiceOptions: 'true',
      };
      const newProps = {
        ...props,
      };
      const actions = { setSubmitting: jest.fn() };

      wrapper = shallow(<ExtrasPreferencesFormContainer {...newProps} />);
      wrapper.instance().handleSubmit(values, actions);
      await Promise.all([updateProfile]).then(() => {
        expect(props.setNotificationMessage).toHaveBeenCalledTimes(1);
        expect(props.setEditView).toHaveBeenCalledTimes(1);
        expect(props.updateProfileStore)
          .toHaveBeenCalledTimes(1)
          .toHaveBeenCalledWith({
            ...props.profile,
            paymentPreference: {
              ...props.profile.paymentPreference,
              electronicInvoiceRequired: true,
            },
            bookingPreference: {
              roomRequirements: {
                ...props.profile.bookingPreference.roomRequirements,
              },
              preselectWifi: false,
              wantSmsConfirmations: false,
              foodPreference: +values.mealOptions,
            },
          });
      });
    });

    it('should generate the correct payload if wifi option is selected', async () => {
      const values = {
        mealOptions: '11',
        wifiOptions: 'true',
        invoiceOptions: 'true',
      };

      const actions = { setSubmitting: jest.fn() };
      wrapper.instance().handleSubmit(values, actions);

      await Promise.all([updateProfile]).then(() => {
        expect(props.setNotificationMessage).toHaveBeenCalledTimes(1);
        expect(props.setEditView).toHaveBeenCalledTimes(1);
        expect(props.updateProfileStore)
          .toHaveBeenCalledTimes(1)
          .toHaveBeenCalledWith({
            ...props.profile,
            paymentPreference: {
              ...props.profile.paymentPreference,
              electronicInvoiceRequired: true,
            },
            bookingPreference: {
              ...props.profile.bookingPreference,
              roomRequirements: {
                ...props.profile.bookingPreference.roomRequirements,
              },
              foodPreference: 11,
              preselectWifi: true,
            },
          });
      });
    });

    it('should generate the correct payload if wifi option is not selected', async () => {
      const values = {
        mealOptions: '11',
        invoiceOptions: 'true',
      };

      const newProps = {
        ...props,
      };

      delete newProps.profile.bookingPreference.preselectWifi;

      wrapper = shallow(<ExtrasPreferencesFormContainer {...newProps} />);

      const actions = { setSubmitting: jest.fn() };
      wrapper.instance().handleSubmit(values, actions);

      await Promise.all([updateProfile]).then(() => {
        expect(props.setNotificationMessage).toHaveBeenCalledTimes(1);
        expect(props.setEditView).toHaveBeenCalledTimes(1);
        expect(props.updateProfileStore)
          .toHaveBeenCalledTimes(1)
          .toHaveBeenCalledWith({
            ...props.profile,
            paymentPreference: {
              ...props.profile.paymentPreference,
              electronicInvoiceRequired: true,
            },
            bookingPreference: {
              ...props.profile.bookingPreference,
              roomRequirements: {
                ...props.profile.bookingPreference.roomRequirements,
              },
              foodPreference: 11,
              preselectWifi: false,
            },
          });
      });
    });

    it('should generate the correct payload if invoice option is selected', async () => {
      const values = {
        mealOptions: '11',
        wifiOptions: 'false',
        invoiceOptions: 'true',
      };

      const actions = { setSubmitting: jest.fn() };
      wrapper.instance().handleSubmit(values, actions);

      await Promise.all([updateProfile]).then(() => {
        expect(props.setNotificationMessage).toHaveBeenCalledTimes(1);
        expect(props.setEditView).toHaveBeenCalledTimes(1);
        expect(props.updateProfileStore)
          .toHaveBeenCalledTimes(1)
          .toHaveBeenCalledWith({
            ...props.profile,
            paymentPreference: {
              ...props.profile.paymentPreference,
              electronicInvoiceRequired: true,
            },
            bookingPreference: {
              ...props.profile.bookingPreference,
              roomRequirements: {
                ...props.profile.bookingPreference.roomRequirements,
              },
              foodPreference: 11,
              preselectWifi: false,
            },
          });
      });
    });

    it('should generate the correct payload if invoice option is not selected', async () => {
      const values = {
        mealOptions: '11',
        wifiOptions: 'false',
        invoiceOptions: 'false',
      };

      const actions = { setSubmitting: jest.fn() };
      wrapper.instance().handleSubmit(values, actions);

      await Promise.all([updateProfile]).then(() => {
        expect(props.setNotificationMessage).toHaveBeenCalledTimes(1);
        expect(props.setEditView).toHaveBeenCalledTimes(1);
        expect(props.updateProfileStore)
          .toHaveBeenCalledTimes(1)
          .toHaveBeenCalledWith({
            ...props.profile,
            paymentPreference: {
              ...props.profile.paymentPreference,
              electronicInvoiceRequired: false,
            },
            bookingPreference: {
              ...props.profile.bookingPreference,
              roomRequirements: {
                ...props.profile.bookingPreference.roomRequirements,
              },
              foodPreference: 11,
              preselectWifi: false,
            },
          });
      });
    });
  });

  describe('ExtrasPreferences form default values', () => {
    it('should default to no meals option for new registered accounts', () => {
      const newAccountProps = {
        ...props,
      };

      delete newAccountProps.profile.bookingPreference;
      delete newAccountProps.profile.paymentPreference;

      const newAccountWrapper = shallow(<ExtrasPreferencesFormContainer {...newAccountProps} />);
      expect(newAccountWrapper.find('Formik').dive()).toMatchSnapshot();
    });
  });
});
