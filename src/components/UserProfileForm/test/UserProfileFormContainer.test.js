import React from 'react';
import { shallow } from 'enzyme';
import { when } from 'jest-when';
import UserProfileFormContainer from '../UserProfileFormContainer';
import {
  validateFirstName,
  validateLastName,
  validatePhoneNumber,
  validatePostCode,
  validateCompanyName,
  validateAddressLine,
} from '../../../utils/validations';
import { USER_DETAILS_ERROR } from '../../App/appActions';

jest.mock('../../../utils/validations', () => ({
  __esModule: true,
  validateFirstName: jest.fn(),
  validateLastName: jest.fn(),
  validatePhoneNumber: jest.fn(),
  validatePostCode: jest.fn(),
  validateCompanyName: jest.fn(),
  validateAddressLine: jest.fn(),
}));

describe('UserProfileFormContainer Component', () => {
  let wrapper;
  let props;
  const updateProfile = jest.fn(() => Promise.resolve({}));

  beforeEach(() => {
    props = {
      updateProfile,
      dictionary: {},
      profile: {
        contactDetail: {
          title: 'Miss',
          firstName: 'Test',
          lastName: 'testing',
          email: 'test@whitbread.com',
          telephone: '+4411111111111',
          mobile: '+4400000000000',
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
            postCode: 'EC1N 2TD',
            countryCode: 'GB',
            type: 'BUSINESS',
            companyName: '',
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
      app: {
        notificationMessage: '',
      },
    };
    wrapper = shallow(<UserProfileFormContainer {...props} />);
    jest.clearAllMocks();
  });

  describe('Renders UserProfileFormContainer Element', () => {
    it('should match snapshot', () => {
      expect(wrapper.find('Formik').dive()).toMatchSnapshot();
    });
  });

  describe('Minimum 1 phone number requirement behaviour', () => {
    it('should strip dialing code from mobile number from profile if dialing code is present', () => {
      wrapper = shallow(<UserProfileFormContainer {...props} />);
      const wrapperProps = wrapper
        .find('[data-test="user-profile-form-wrapper"]')
        .props();

      expect(wrapperProps.initialValues.mobile).toBe('00000000000');
    });

    it('should not strip dialing code from mobile number from profile if dialing code is not present', () => {
      props.profile.contactDetail.mobile = '00000000000';

      wrapper = shallow(<UserProfileFormContainer {...props} />);
      const wrapperProps = wrapper
        .find('[data-test="user-profile-form-wrapper"]')
        .props();

      expect(wrapperProps.initialValues.mobile).toBe('00000000000');
    });

    it('should pass empty mobile string value to form if one is not present in profile', () => {
      props.profile.contactDetail.mobile = undefined;
      wrapper = shallow(<UserProfileFormContainer {...props} />);

      const wrapperProps = wrapper
        .find('[data-test="user-profile-form-wrapper"]')
        .props();

      const { initialValues } = wrapperProps;

      expect(initialValues).toEqual({
        businessAddress: 'true',
        companyName: '',
        countryCode: 'GB',
        dialingCountryCode: 'GB',
        email: 'test@whitbread.com',
        firstName: 'Test',
        lastName: 'testing',
        line1: 'Random house',
        line2: 'Random street',
        line3: '',
        line4: 'LONDON',
        mobile: '',
        postCode: 'EC1N 2TD',
        telephone: '11111111111',
        title: 'Miss',
        type: 'BUSINESS',
      });
    });

    it('should strip dialing code from telephone numberfrom profile if dialing code is present', () => {
      wrapper = shallow(<UserProfileFormContainer {...props} />);
      const wrapperProps = wrapper
        .find('[data-test="user-profile-form-wrapper"]')
        .props();

      expect(wrapperProps.initialValues.telephone).toBe('11111111111');
    });

    it('should not strip dialing code from telephone number from profile if dialling code is not present', () => {
      props.profile.contactDetail.telephone = '11111111111';
      wrapper = shallow(<UserProfileFormContainer {...props} />);
      const wrapperProps = wrapper
        .find('[data-test="user-profile-form-wrapper"]')
        .props();

      expect(wrapperProps.initialValues.telephone).toBe('11111111111');
    });

    it('should pass empty telephone string value to form if one is not present in profile', () => {
      props.profile.contactDetail.telephone = undefined;
      wrapper = shallow(<UserProfileFormContainer {...props} />);

      const wrapperProps = wrapper
        .find('[data-test="user-profile-form-wrapper"]')
        .props();

      const { initialValues } = wrapperProps;

      expect(initialValues).toEqual({
        businessAddress: 'true',
        companyName: '',
        countryCode: 'GB',
        dialingCountryCode: 'GB',
        email: 'test@whitbread.com',
        firstName: 'Test',
        lastName: 'testing',
        line1: 'Random house',
        line2: 'Random street',
        line3: '',
        line4: 'LONDON',
        mobile: '00000000000',
        postCode: 'EC1N 2TD',
        telephone: '',
        title: 'Miss',
        type: 'BUSINESS',
      });
    });
  });

  describe('User Profile Form validations', () => {
    it('should validate all fields calling all validation functions with the correct values', () => {
      const values = {
        firstName: 'Toaster',
        lastName: 'Stroodle',
        postCode: 'EC1N 2TD',
        countryCode: 'GB',
        companyName: 'Whitbread PLC',
        line1: '120 Holborn',
        mobile: '1234567890',
        telephone: '1234567890',
        type: 'BUSINESS',
      };

      wrapper
        .find('[data-test="user-profile-form-wrapper"]')
        .props()
        .validate(values);

      expect(validateFirstName).toHaveBeenCalledWith('Toaster');
      expect(validateLastName).toHaveBeenCalledWith('Stroodle');
      expect(validatePhoneNumber).toHaveBeenCalledWith('1234567890', 'profile.error.telephone');
      expect(validatePhoneNumber).toHaveBeenCalledWith('1234567890', 'profile.error.mobile');
      expect(validatePostCode).toHaveBeenCalledWith('EC1N 2TD', 'GB');
      expect(validateCompanyName).toHaveBeenCalledWith('Whitbread PLC');
      expect(validateAddressLine).toHaveBeenCalledTimes(4);
    });

    it('should return the correct validation result based on correct values', () => {
      const values = {
        firstName: 'Toaster',
        lastName: 'Stroodle',
        postCode: 'EC1N 2TD',
        companyName: 'Whitbread PLC',
        line1: '120 Holborn',
        mobile: '1234567890',
        telephone: '11111111111',
        type: 'BUSINESS',
      };

      const validationResult = wrapper
        .find('[data-test="user-profile-form-wrapper"]')
        .props()
        .validate(values);

      expect(validationResult).toEqual({
        firstName: undefined,
        lastName: undefined,
        mobile: undefined,
        telephone: undefined,
        postCode: undefined,
        companyName: undefined,
        line1: undefined,
      });
    });

    it('should return the correct validation result based on incorrect values', () => {
      const values = {
        firstName: 'Tester123!',
        lastName: 'Man123!',
        postCode: 'EC1N 2TD!',
        companyName: '',
        line1: 'Random House!',
        mobile: '1234567890!',
        telephone: '1234567890!',
        type: 'BUSINESS',
      };

      validateFirstName.mockImplementationOnce(() => 'Please enter a valid first name');
      validateLastName.mockImplementationOnce(() => 'Please enter a valid last name');
      validatePhoneNumber.mockImplementationOnce(() => 'Please enter a valid telephone number');
      validatePhoneNumber.mockImplementationOnce(() => 'Please enter a valid mobile number');
      validatePostCode.mockImplementationOnce(() => 'Please enter a valid postcode');
      validateAddressLine.mockImplementationOnce(() => 'Please enter the first line of your address');
      validateCompanyName.mockImplementationOnce(() => 'Please enter your company name');

      const validationResult = wrapper
        .find('[data-test="user-profile-form-wrapper"]')
        .props()
        .validate(values);

      expect(validationResult).toEqual({
        firstName: 'Please enter a valid first name',
        lastName: 'Please enter a valid last name',
        mobile: 'Please enter a valid mobile number',
        telephone: 'Please enter a valid telephone number',
        postCode: 'Please enter a valid postcode',
        line1: 'Please enter the first line of your address',
        companyName: 'Please enter your company name',
      });
    });

    it('should return the correct validation result for invalid address length', () => {
      const values = {
        line1: '120 Holborn',
        line2: 'London1!',
        line3: 'London1!',
        line4: 'London1!',
      };

      when(validateAddressLine).calledWith(values.line2, false).mockReturnValue('Address contains illegal characters');
      when(validateAddressLine).calledWith(values.line3, false).mockReturnValue('Address contains illegal characters');
      when(validateAddressLine).calledWith(values.line4, false).mockReturnValue('Address contains illegal characters');

      const validationResult = wrapper
        .find('[data-test="user-profile-form-wrapper"]')
        .props()
        .validate(values);

      expect(validationResult.line2).toEqual('Address contains illegal characters');
      expect(validationResult.line3).toEqual('Address contains illegal characters');
      expect(validationResult.line4).toEqual('Address contains illegal characters');
    });

    describe('Minimum 1 phone number requirement behaviour', () => {
      it('should return the correct validation result based on correct values when the user enters a telephone number and no mobile number', () => {
        const values = {
          firstName: 'Toaster',
          lastName: 'Stroodle',
          postCode: 'EC1N 2TD',
          companyName: 'Whitbread PLC',
          line1: '120 Holborn',
          telephone: '11111111111',
          type: 'BUSINESS',
        };

        const validationResult = wrapper
          .find('[data-test="user-profile-form-wrapper"]')
          .props()
          .validate(values);

        expect(validationResult).toEqual({
          firstName: undefined,
          lastName: undefined,
          mobile: undefined,
          telephone: undefined,
          postCode: undefined,
          companyName: undefined,
          line1: undefined,
        });
      });

      it('should return the correct validation result based on incorrect values when the user enters a telephone number and no mobile number', () => {
        const values = {
          firstName: 'Tester123!',
          lastName: 'Man123!',
          postCode: 'EC1N 2TD!',
          companyName: '',
          line1: 'Random House!',
          telephone: '1234567890!',
          type: 'BUSINESS',
        };

        validateFirstName.mockImplementationOnce(() => 'Please enter a valid first name');
        validateLastName.mockImplementationOnce(() => 'Please enter a valid last name');
        validatePhoneNumber.mockImplementationOnce(() => 'Please enter a valid telephone number');
        validatePostCode.mockImplementationOnce(() => 'Please enter a valid postcode');
        validateAddressLine.mockImplementationOnce(() => 'Please enter the first line of your address');
        validateCompanyName.mockImplementationOnce(() => 'Please enter your company name');

        const validationResult = wrapper
          .find('[data-test="user-profile-form-wrapper"]')
          .props()
          .validate(values);

        expect(validationResult).toEqual({
          firstName: 'Please enter a valid first name',
          lastName: 'Please enter a valid last name',
          telephone: 'Please enter a valid telephone number',
          postCode: 'Please enter a valid postcode',
          line1: 'Please enter the first line of your address',
          companyName: 'Please enter your company name',
        });
      });

      it('should return the correct validation result based on correct values when the user enters a mobile number and no telephone number', () => {
        const values = {
          firstName: 'Toaster',
          lastName: 'Stroodle',
          postCode: 'EC1N 2TD',
          companyName: 'Whitbread PLC',
          line1: '120 Holborn',
          mobile: '1234567890',
          type: 'BUSINESS',
        };

        const validationResult = wrapper
          .find('[data-test="user-profile-form-wrapper"]')
          .props()
          .validate(values);

        expect(validationResult).toEqual({
          firstName: undefined,
          lastName: undefined,
          mobile: undefined,
          telephone: undefined,
          postCode: undefined,
          companyName: undefined,
          line1: undefined,
        });
      });

      it('should return the correct validation result based on incorrect values when the user enters a mobile number and no telephone number', () => {
        const values = {
          firstName: 'Tester123!',
          lastName: 'Man123!',
          postCode: 'EC1N 2TD!',
          companyName: '',
          line1: 'Random House!',
          mobile: '1234567890!',
          type: 'BUSINESS',
        };

        validateFirstName.mockImplementationOnce(() => 'Please enter a valid first name');
        validateLastName.mockImplementationOnce(() => 'Please enter a valid last name');
        validatePhoneNumber.mockImplementationOnce(() => 'Please enter a valid mobile number');
        validatePostCode.mockImplementationOnce(() => 'Please enter a valid postcode');
        validateAddressLine.mockImplementationOnce(() => 'Please enter the first line of your address');
        validateCompanyName.mockImplementationOnce(() => 'Please enter your company name');

        const validationResult = wrapper
          .find('[data-test="user-profile-form-wrapper"]')
          .props()
          .validate(values);

        expect(validationResult).toEqual({
          firstName: 'Please enter a valid first name',
          lastName: 'Please enter a valid last name',
          mobile: 'Please enter a valid mobile number',
          postCode: 'Please enter a valid postcode',
          line1: 'Please enter the first line of your address',
          companyName: 'Please enter your company name',
        });
      });

      it('should return the correct validation result based on incorrect values when the user does not enter a mobile number or telephone number', () => {
        const values = {
          firstName: 'Tester123!',
          lastName: 'Man123!',
          postCode: 'EC1N 2TD!',
          companyName: '',
          line1: 'Random House!',
          type: 'BUSINESS',
        };

        validateFirstName.mockImplementationOnce(() => 'Please enter a valid first name');
        validateLastName.mockImplementationOnce(() => 'Please enter a valid last name');
        validatePostCode.mockImplementationOnce(() => 'Please enter a valid postcode');
        validateAddressLine.mockImplementationOnce(() => 'Please enter the first line of your address');
        validateCompanyName.mockImplementationOnce(() => 'Please enter your company name');

        const validationResult = wrapper
          .find('[data-test="user-profile-form-wrapper"]')
          .props()
          .validate(values);

        expect(validationResult).toEqual({
          firstName: 'Please enter a valid first name',
          lastName: 'Please enter a valid last name',
          mobile: 'profile.error.missingPhoneNumber',
          telephone: 'profile.error.missingPhoneNumber',
          postCode: 'Please enter a valid postcode',
          line1: 'Please enter the first line of your address',
          companyName: 'Please enter your company name',
        });
      });
    });
  });

  describe('User Profile Form Submission', () => {
    it('should trigger handleSubmit function when User Profile form is submitted', () => {
      const onSubmitMock = jest.fn();

      wrapper.instance().handleSubmit = onSubmitMock;
      wrapper.instance().forceUpdate();
      wrapper.find('Formik').simulate('submit');
      expect(onSubmitMock).toHaveBeenCalledTimes(1);
    });

    it('should execute Profile update success and return null for company name', async () => {
      const setSubmitting = jest.fn();
      const createPayload = jest.fn();

      const values = {
        title: 'Mr',
        firstName: 'Toaster',
        lastName: 'Stroodle',
        dialingCountryCode: 'GB',
        line1: '120 Holborn',
        line2: '',
        line3: '',
        line4: '',
        type: 'HOME',
        postCode: 'EC1N 2TD',
        countryCode: 'GB',
        companyName: '',
        mobile: '1234567890',
        telephone: '11111111111',
      };

      wrapper.instance().handleSubmit.apply({ props, createPayload }, [
        values,
        { setSubmitting },
      ]);

      await Promise.all([updateProfile]).then(() => {
        expect(updateProfile).toHaveBeenCalledWith({
          contactDetail: {
            address: {
              companyName: null,
              countryCode: 'GB',
              line1: '120 Holborn',
              line2: '',
              line3: '',
              line4: '',
              postCode: 'EC1N 2TD',
              type: 'HOME',
            },
            carRegistration: '',
            email: 'test@whitbread.com',
            firstName: 'Toaster',
            lastName: 'Stroodle',
            mobile: '+441234567890',
            nationality: 'GB',
            passport: {
              countryOfIssue: '',
              number: '',
            },
            telephone: '+4411111111111',
            title: 'Mr',
          },
        });
        expect(props.setNotificationMessage).toHaveBeenCalledTimes(1);
        expect(props.setEditView).toHaveBeenCalledTimes(1);
        expect(props.updateProfileStore).toHaveBeenCalledTimes(1);
      });
    });

    it('should execute Profile update success', async () => {
      const setSubmitting = jest.fn();
      const createPayload = jest.fn();

      const values = {
        title: 'Mr',
        firstName: 'Toaster',
        lastName: 'Stroodle',
        dialingCountryCode: 'GB',
        line1: '120 Holborn',
        line2: '',
        line3: '',
        line4: '',
        type: 'BUSINESS',
        postCode: 'EC1N 2TD',
        countryCode: 'GB',
        companyName: 'Whitbread PLC',
        mobile: '1234567890',
      };

      wrapper.instance().handleSubmit.apply({ props, createPayload }, [
        values,
        { setSubmitting },
      ]);

      await Promise.all([updateProfile]).then(() => {
        expect(props.setNotificationMessage).toHaveBeenCalledTimes(1);
        expect(props.setEditView).toHaveBeenCalledTimes(1);
        expect(props.updateProfileStore).toHaveBeenCalledTimes(1);
      });
    });

    it('should show error message on generic api failure', async () => {
      const createPayload = jest.fn();

      const values = {
        title: 'Mr',
        firstName: 'Toaster',
        lastName: 'Stroodle',
        dialingCountryCode: 'GB',
        line1: '120 Holborn',
        line2: '',
        line3: '',
        line4: '',
        type: 'BUSINESS',
        postCode: 'EC1N 2TD',
        countryCode: 'GB',
        companyName: 'Whitbread PLC',
        mobile: '1234567890',
      };

      updateProfile.mockImplementationOnce(() => Promise.reject({
        data: {
          code: '999',
          details: ['Bad Request [400]'],
        },
      }));

      wrapper.instance().handleSubmit.apply({ props, createPayload }, [values, {}]);

      await Promise.all([updateProfile]).then(() => {
        expect(props.setNotificationMessage)
          .toHaveBeenCalledTimes(1)
          .toHaveBeenCalledWith(USER_DETAILS_ERROR);
        expect(props.updateProfileStore).not.toHaveBeenCalled();
      });
    });

    it('should display error notification', () => {
      const newProps = {
        ...props,
        app: { notificationMessage: USER_DETAILS_ERROR },
      };
      wrapper = shallow(<UserProfileFormContainer {...newProps} />);
      expect(wrapper.find('[data-test="error-notification"]')).toHaveLength(1);
    });

    describe('Minimum 1 phone number requirement behaviour', () => {
      const setSubmitting = jest.fn();
      const createPayload = jest.fn();

      const values = {
        title: 'Mr',
        firstName: 'Toaster',
        lastName: 'Stroodle',
        dialingCountryCode: 'GB',
        line1: '120 Holborn',
        line2: '',
        line3: '',
        line4: '',
        type: 'HOME',
        postCode: 'EC1N 2TD',
        countryCode: 'GB',
        companyName: '',
      };

      it('should set mobile to empty string in payload if a value has not been entered', async () => {
        values.telephone = '11111111111';
        values.mobile = undefined;

        wrapper.instance().handleSubmit.apply({ props, createPayload }, [
          values,
          { setSubmitting },
        ]);

        await Promise.all([updateProfile]).then(() => {
          expect(updateProfile).toHaveBeenCalledWith({
            contactDetail: {
              address: {
                companyName: null,
                countryCode: 'GB',
                line1: '120 Holborn',
                line2: '',
                line3: '',
                line4: '',
                postCode: 'EC1N 2TD',
                type: 'HOME',
              },
              carRegistration: '',
              email: 'test@whitbread.com',
              firstName: 'Toaster',
              lastName: 'Stroodle',
              nationality: 'GB',
              passport: {
                countryOfIssue: '',
                number: '',
              },
              telephone: '+4411111111111',
              mobile: '',
              title: 'Mr',
            },
          });
          expect(props.setNotificationMessage).toHaveBeenCalledTimes(1);
          expect(props.setEditView).toHaveBeenCalledTimes(1);
          expect(props.updateProfileStore).toHaveBeenCalledTimes(1);
        });
      });

      it('should set telephone to empty string in payload if a value has not been entered', async () => {
        values.mobile = '1234567890';
        values.telephone = undefined;

        wrapper.instance().handleSubmit.apply({ props, createPayload }, [
          values,
          { setSubmitting },
        ]);

        await Promise.all([updateProfile]).then(() => {
          expect(updateProfile).toHaveBeenCalledWith({
            contactDetail: {
              address: {
                companyName: null,
                countryCode: 'GB',
                line1: '120 Holborn',
                line2: '',
                line3: '',
                line4: '',
                postCode: 'EC1N 2TD',
                type: 'HOME',
              },
              carRegistration: '',
              email: 'test@whitbread.com',
              firstName: 'Toaster',
              lastName: 'Stroodle',
              nationality: 'GB',
              passport: {
                countryOfIssue: '',
                number: '',
              },
              telephone: '',
              mobile: '+441234567890',
              title: 'Mr',
            },
          });
          expect(props.setNotificationMessage).toHaveBeenCalledTimes(1);
          expect(props.setEditView).toHaveBeenCalledTimes(1);
          expect(props.updateProfileStore).toHaveBeenCalledTimes(1);
        });
      });
    });
  });
});
