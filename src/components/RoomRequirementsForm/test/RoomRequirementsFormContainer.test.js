import React from 'react';
import { shallow } from 'enzyme';
import RoomRequirementsFormContainer from '../RoomRequirementsFormContainer';
import { ROOM_REQUIREMENTS_ERROR } from '../../App/appActions';
import { roomRequirements as roomRequirementsConfig } from '../../../config.json';

describe('RoomRequirementsFormContainer Component', () => {
  const updateProfile = jest.fn(() => Promise.resolve({}));
  let wrapper;
  let props;
  let baseProfile;

  beforeEach(() => {
    baseProfile = {
      businessUse: false,
      companyId: '',
      contactDetail: {
        title: 'Mr',
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
      guestHistoryNumber: 'G14187551',
      sessionId: 'zdiKE1MflNUmdXAS',
    };
    props = {
      updateProfile,
      app: {},
      profile: {
        ...baseProfile,
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
            type: 'FAM',
            adults: 2,
            children: 1,
            cotRequired: false,
            hotelBrand: 'ZIP',
          },
          foodPreference: 11,
          wantSmsConfirmations: false,
        },
        companyName: 'Pareto Law',
      },
      dictionary: {
        'roomrequirements.title.edit': 'Edit room requirements',
        'roomrequirements.type.double': 'Double',
        'roomrequirements.type.single': 'Single',
        'roomrequirements.type.accessible': 'Accessible',
        'roomrequirements.type.family': 'Family',
      },
      setEditView: jest.fn(),
      setNotificationMessage: jest.fn(),
      updateProfileStore: jest.fn(),
      setFieldValue: jest.fn(),
    };
    wrapper = shallow(<RoomRequirementsFormContainer {...props} />);
  });

  describe('Renders RoomRequirementsFormContainer Element', () => {
    it('should match snapshot', () => {
      expect(wrapper.find('Formik').dive()).toMatchSnapshot();
    });

    it('should show error notification', () => {
      props.app.notificationMessage = ROOM_REQUIREMENTS_ERROR;
      wrapper = shallow(<RoomRequirementsFormContainer {...props} />);
      expect(wrapper).toContainExactlyOneMatchingElement('[data-test="error-notification"]');
    });
  });

  describe('Room Requirements Form submission', () => {
    let setSubmitting;
    let createPayload;

    beforeEach(() => {
      setSubmitting = jest.fn();
      createPayload = jest.fn();
      jest.clearAllMocks();
    });

    it('should execute Profile update success', async () => {
      wrapper.instance().handleSubmit.apply({ props, createPayload }, [
        {},
        { setSubmitting },
      ]);
      await Promise.all([updateProfile]);

      expect(props.setNotificationMessage).toHaveBeenCalledTimes(1);
      expect(props.setEditView).toHaveBeenCalledTimes(1);
      expect(props.updateProfileStore).toHaveBeenCalledTimes(1);
    });

    it('should set default values for missing roomRequirements values', async () => {
      props.profile = baseProfile;
      wrapper = shallow(<RoomRequirementsFormContainer {...props} />);

      expect(wrapper.find('Formik').props().initialValues).toEqual({ ...roomRequirementsConfig.defaults, hotelBrand: undefined });
    });

    it('should set default values for partial missing roomRequirements values and preserve those already set', async () => {
      const partialRoomRequirements = { adults: 2 };

      props.profile.bookingPreference.roomRequirements = partialRoomRequirements;
      wrapper = shallow(<RoomRequirementsFormContainer {...props} />);

      expect(wrapper.find('Formik').props().initialValues).toEqual({ ...roomRequirementsConfig.defaults, ...partialRoomRequirements, hotelBrand: undefined });
    });

    it('should set error notification', async () => {
      updateProfile.mockImplementationOnce(jest.fn(() => Promise.reject({})));
      wrapper.instance().handleSubmit.apply({ props, createPayload }, [{}, {}]);
      await Promise.all([updateProfile]);

      expect(props.setNotificationMessage)
        .toHaveBeenCalledTimes(1)
        .toHaveBeenCalledWith(ROOM_REQUIREMENTS_ERROR);
      expect(props.updateProfileStore).not.toHaveBeenCalled();
    });
  });

  describe('createPayload()', () => {
    const roomRequirements = {
      adults: '1',
      children: '1',
      cotRequired: 'true',
      type: 'FAM',
    };
    it('should set cotRequired to correct boolean value', () => {
      const {
        bookingPreference: {
          roomRequirements: { cotRequired: cotRequiredTrue },
        },
      } = wrapper.instance().createPayload.apply({ props }, [roomRequirements]);

      expect(cotRequiredTrue).toBe(true);

      roomRequirements.cotRequired = 'false';

      const {
        bookingPreference: {
          roomRequirements: { cotRequired: cotRequiredFalse },
        },
      } = wrapper.instance().createPayload.apply({ props }, [roomRequirements]);

      expect(cotRequiredFalse).toBe(false);
    });

    it('should use the profile hotelBrand if set', () => {
      const {
        bookingPreference: {
          roomRequirements: { hotelBrand },
        },
      } = wrapper.instance().createPayload.apply({ props }, [roomRequirements]);
      expect(hotelBrand).toBe('ZIP');
    });

    it('should use the config hotelBrand if profile hotelBrand not set', () => {
      const {
        bookingPreference: {
          roomRequirements: { hotelBrand },
        },
      } = wrapper.instance().createPayload
        .apply({
          props: {
            ...props,
            profile: { ...props.profile, bookingPreference: undefined },
          },
        }, [roomRequirements]);
      expect(hotelBrand).toBe('PI');
    });
  });
});
