import React from 'react';
import { shallow } from 'enzyme';
import RegularGuestsFormContainer from '../RegularGuestsFormContainer';
import { matchDialingCode } from '../../../utils/matchDialingCode';
import { DEFAULT_VIEW, REGULAR_GUESTS_ERROR, REGULAR_GUESTS_VIEW } from '../../App/appActions';
import {
  validateTitle,
  validateFirstName,
  validateLastName,
  validateEmail,
  validatePassportNumber,
  validatePhoneNumber,
} from '../../../utils/validations';

jest.mock('../../../utils/validations', () => ({
  __esModule: true,
  validateTitle: jest.fn(),
  validateFirstName: jest.fn(),
  validateLastName: jest.fn(),
  validateEmail: jest.fn(),
  validatePassportNumber: jest.fn(),
  validatePhoneNumber: jest.fn(),
}));

describe('RegularGuestsFormContainer Component', () => {
  const DEFAULT_COUNTRY = {
    countryCode: 'GB',
    dialingCode: '+44',
  };

  let wrapper;
  let props;
  const updateProfile = jest.fn(() => Promise.resolve({}));

  beforeEach(() => {
    props = {
      updateProfile,
      app: {
        editViewName: 'test',
      },
      profile: {
        contactDetail: {
          title: 'Mr',
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
        additionalGuests: [
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
        ],
      },
      dictionary: {
        'guests.form.title.edit': 'Edit regular guest',
        'guests.form.title.add': 'Add regular guest',
        'guests.notification': 'Make sure you have permission to save this guest’s details.',
        'guests.button.add': 'Add regular guest',
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
      setNotificationMessage: jest.fn(),
      updateProfileStore: jest.fn(),
      setEditView: jest.fn(),
    };

    wrapper = shallow(<RegularGuestsFormContainer {...props} />);
    jest.clearAllMocks();
  });

  describe('Renders Regular Guests Form Container Component Elements', () => {
    it('should render the component', () => {
      expect(wrapper.find('Formik').dive()).toMatchSnapshot();
    });

    it('should render the notification', () => {
      expect(wrapper.find('Notification')).toHaveLength(1);
    });

    it('should render the edit guest title when on edit guest view', () => {
      const newProp = {
        app: {
          editViewName: 'REGULAR_GUESTS_VIEW_1',
        },
        index: 1,
      };
      wrapper = shallow(<RegularGuestsFormContainer {...props} {...newProp} />);
      expect(wrapper.find('Typography')).toHaveProp('children', 'Edit regular guest');
    });

    it('should render the add regular guest title when on add guest view', () => {
      const biggerProps = {
        app: {
          editViewName: 'ADD_GUEST_VIEW',
        },
        index: 1,
      };
      wrapper = shallow(<RegularGuestsFormContainer {...props} {...biggerProps} />);
      expect(wrapper.find('Typography')).toHaveProp('children', 'Add regular guest');
    });

    it('should set state false when a commonwealth country has been selected', () => {
      const event = { target: { value: 'GB' } };
      wrapper.instance().isPassportRequired(event);
      expect(wrapper.state().passportRequired).toBeFalsy();
    });
  });

  describe('Regular Guests Form Container initial values', () => {
    it('should get GB country code if there\'s no + indicator on mobile number', () => {
      expect(matchDialingCode('99999999', props.countries, 'MOON')).toEqual(DEFAULT_COUNTRY);
    });

    it('should match with address countryCode first', () => {
      expect(matchDialingCode('+4999999999', props.countries, 'D')).toBe(props.countries[1]);
    });

    it('should return strongest match if it doesn\'t match with address country code', () => {
      expect(matchDialingCode('+4999999999', props.countries, 'GB')).toBe(props.countries[3]);
    });

    it('should default to GB if there are no matches at all', () => {
      expect(matchDialingCode('+4123999999999', props.countries, 'GB')).toEqual(DEFAULT_COUNTRY);
    });

    it('should strip dialing code from mobile number', () => {
      const testingProps = {
        mobile: '+4400000000000',
      };

      wrapper = shallow(<RegularGuestsFormContainer {...testingProps} {...props} />);
      expect(wrapper.state().mobile).toBe('00000000000');
    });
  });

  describe('Regular Guests Form Container validation', () => {
    const current = {
      initialValues: {
        email: 'james.freeman@gmail.com',
      },
    };

    it('should validate fields with correct values when adding a new regular guest', () => {
      const validationProps = {
        ...props,
        profile: {
          contactDetail: {
            title: 'Mr',
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
        app: {
          editViewName: 'ADD_GUEST_VIEW',
        },
      };

      const values = {
        title: 'Mr',
        firstName: 'Morgan',
        lastName: 'Freeman',
        email: 'morgan.freeman@testmail.com',
        countryCode: 'TUR',
        passportNumber: '1234567890',
        dialingCountryCode: 'GB',
        mobile: '1234567890',
      };

      wrapper = shallow(<RegularGuestsFormContainer {...validationProps} />);
      wrapper.instance().form.current = current;

      wrapper.setState({ passportRequired: true });

      wrapper
        .find('[data-test="regular-guests-form-wrapper"]')
        .props()
        .validate(values);

      expect(validateTitle).toHaveBeenCalledWith('Mr');
      expect(validateFirstName).toHaveBeenCalledWith('Morgan');
      expect(validateLastName).toHaveBeenCalledWith('Freeman');
      expect(validateEmail).toHaveBeenCalledWith('morgan.freeman@testmail.com', [], true);
      expect(validatePassportNumber).toHaveBeenLastCalledWith('1234567890');
      expect(validatePhoneNumber).toHaveBeenCalledWith('1234567890', 'profile.error.telephone');
    });

    it('should validate fields with correct values when adding another regular guest', () => {
      const validationProps = {
        ...props,
        app: {
          editViewName: 'ADD_GUEST_VIEW',
        },
      };

      const values = {
        title: 'Mr',
        firstName: 'Morgan',
        lastName: 'Freeman',
        email: 'morgan.freeman@testmail.com',
        countryCode: 'TUR',
        passportNumber: '1234567890',
        dialingCountryCode: 'GB',
        mobile: '1234567890',
      };

      wrapper = shallow(<RegularGuestsFormContainer {...validationProps} />);
      wrapper.instance().form.current = current;
      wrapper.setState({ passportRequired: true });
      wrapper
        .find('[data-test="regular-guests-form-wrapper"]')
        .props()
        .validate(values);

      expect(validateTitle).toHaveBeenCalledWith('Mr');
      expect(validateFirstName).toHaveBeenCalledWith('Morgan');
      expect(validateLastName).toHaveBeenCalledWith('Freeman');
      expect(validateEmail).toHaveBeenCalledWith('morgan.freeman@testmail.com', ['kfc@test.com'], true);
      expect(validatePassportNumber).toHaveBeenLastCalledWith('1234567890');
      expect(validatePhoneNumber).toHaveBeenCalledWith('1234567890', 'profile.error.telephone');
    });

    it('should pass all validation and not display any error messages', () => {
      const values = {
        title: 'Mr',
        firstName: 'Morgan',
        lastName: 'Freeman',
        email: 'morgan.freeman@testmail.com',
        countryCode: 'TUR',
        passportNumber: '1234567890',
        dialingCountryCode: 'GB',
        mobile: '1234567890',
      };

      wrapper.instance().form.current = current;

      const validationResult = wrapper
        .find('[data-test="regular-guests-form-wrapper"]')
        .props()
        .validate(values);

      expect(validationResult).toEqual({
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        passportNumber: undefined,
        mobile: undefined,
      });
    });

    it('should return the error messages based on incorrect values', () => {
      const values = {
        title: 'Mr',
        firstName: 'Morgan!',
        lastName: 'Freeman1',
        email: 'morgan.freeman@com',
        countryCode: 'TUR',
        passportNumber: '1234567890',
        dialingCountryCode: 'GB',
        mobile: '!1234567890',
      };

      validateTitle.mockImplementationOnce(() => 'Please select a title');
      validateFirstName.mockImplementationOnce(() => 'Please enter a valid first name');
      validateLastName.mockImplementationOnce(() => 'Please enter a valid last name');
      validateEmail.mockImplementationOnce(() => 'Please enter a valid email');
      validatePassportNumber.mockImplementationOnce(() => 'Please enter a valid passport number');
      validatePhoneNumber.mockImplementationOnce(() => 'Please enter a valid number');

      wrapper.instance().form.current = current;
      wrapper.setState({ passportRequired: true });

      const validationResult = wrapper
        .find('[data-test="regular-guests-form-wrapper"]')
        .props()
        .validate(values);

      expect(validationResult).toEqual({
        title: 'Please select a title',
        firstName: 'Please enter a valid first name',
        lastName: 'Please enter a valid last name',
        email: 'Please enter a valid email',
        passportNumber: 'Please enter a valid passport number',
        mobile: 'Please enter a valid number',
      });
    });
  });

  describe('Regular Guests Form Container submission', () => {
    it('should trigger handleSubmit function when RegularGuestsFormContainer is submitted', () => {
      const onSubmitMock = jest.fn();

      wrapper.instance().handleSubmit = onSubmitMock;
      wrapper.instance().forceUpdate();
      wrapper.find('Formik').simulate('submit');
      expect(onSubmitMock).toHaveBeenCalledTimes(1);
    });

    it('should execute Profile update success', async () => {
      const setSubmitting = jest.fn();
      const createPayload = jest.fn();

      const values = {
        title: 'Mr',
        firstName: 'Morgan',
        lastName: 'Freeman',
        email: 'morgan.freeman@testmail.com',
        countryCode: 'TUR',
        passportNumber: '1234567890',
        dialingCountryCode: 'GB',
        mobile: '1234567890',
      };

      wrapper.instance().handleSubmit.apply({ props, createPayload }, [
        values,
        { setSubmitting },
      ]);

      await Promise.all([updateProfile]).then(() => {
        expect(props.setNotificationMessage).toHaveBeenCalledTimes(1);
        expect(props.updateProfileStore).toHaveBeenCalledTimes(1);
        expect(props.setEditView).toHaveBeenCalledTimes(1);
      });
    });

    it('should set ERROR notification when updateProfile fails ', async () => {
      updateProfile.mockImplementationOnce(jest.fn(() => Promise.reject({})));

      const values = {
        title: 'Mr',
        firstName: 'Morgan',
        lastName: 'Freeman',
        email: 'morgan.freeman@testmail.com',
        countryCode: 'TUR',
        passportNumber: '1234567890',
        dialingCountryCode: 'GB',
        mobile: '1234567890',
      };

      const createPayload = jest.fn();

      wrapper.instance().handleSubmit.apply({ props, createPayload }, [values, {}]);

      await Promise.all([updateProfile]).then(() => {
        expect(props.setNotificationMessage)
          .toHaveBeenCalledTimes(1)
          .toHaveBeenCalledWith(REGULAR_GUESTS_ERROR);
        expect(props.updateProfileStore).not.toHaveBeenCalled();
      });
    });

    it('should generate correct payload if regular guests does not exist', async () => {
      const guestsProps = {
        ...props,
      };

      delete guestsProps.profile.additionalGuests;

      wrapper = shallow(<RegularGuestsFormContainer {...guestsProps} />);

      const values = {
        title: 'Mrs',
        firstName: 'Pizza',
        lastName: 'Hut',
        email: 'ph@test.com',
        mobile: '1111111111',
        dialingCountryCode: 'GB',
      };

      const actions = { setSubmitting: jest.fn() };
      wrapper.instance().handleSubmit(values, actions);

      await Promise.all([updateProfile]).then(() => {
        expect(props.setNotificationMessage)
          .toHaveBeenCalledTimes(1)
          .toHaveBeenCalledWith(REGULAR_GUESTS_VIEW);
        expect(props.setEditView)
          .toHaveBeenCalledTimes(1)
          .toHaveBeenCalledWith(DEFAULT_VIEW);
        expect(props.setEditView)
          .toHaveBeenCalledTimes(1)
          .toHaveBeenCalledWith(DEFAULT_VIEW);
        expect(actions.setSubmitting)
          .toHaveBeenCalledTimes(1)
          .toHaveBeenCalledWith(false);
        expect(props.updateProfileStore)
          .toHaveBeenCalledTimes(1)
          .toHaveBeenCalledWith({
            ...props.profile,
            additionalGuests: [
              {
                title: 'Mrs',
                firstName: 'Pizza',
                lastName: 'Hut',
                email: 'ph@test.com',
                mobile: '+441111111111',
              },
            ],
          });
      });
    });

    it('should generate correct payload when updating regular guest', async () => {
      const testProps = {
        email: 'kfc@test.com',
      };

      wrapper = shallow(<RegularGuestsFormContainer {...props} {...testProps} />);

      const values = {
        title: 'Miss',
        firstName: 'Kentucky',
        lastName: 'Extra Fried Chicken',
        email: 'kfc@test.com',
        telephone: '1111111111',
        mobile: '+441111111111',
        dialingCountryCode: 'GB',
      };

      const actions = { setSubmitting: jest.fn() };
      wrapper.instance().handleSubmit(values, actions);

      await Promise.all([updateProfile]).then(() => {
        expect(props.setNotificationMessage)
          .toHaveBeenCalledTimes(1)
          .toHaveBeenCalledWith(REGULAR_GUESTS_VIEW);
        expect(props.setEditView)
          .toHaveBeenCalledTimes(1)
          .toHaveBeenCalledWith(DEFAULT_VIEW);
        expect(props.setEditView)
          .toHaveBeenCalledTimes(1)
          .toHaveBeenCalledWith(DEFAULT_VIEW);
        expect(actions.setSubmitting)
          .toHaveBeenCalledTimes(1)
          .toHaveBeenCalledWith(false);
        expect(props.updateProfileStore)
          .toHaveBeenCalledTimes(1)
          .toHaveBeenCalledWith({
            ...props.profile,
            additionalGuests: [
              ...props.profile.additionalGuests,
            ],
          });
      });
    });
  });
});
