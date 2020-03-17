import React from 'react';
import { shallow } from 'enzyme';
import { HeaderInterface } from 'mega-code';
import DeleteCustomer from '../DeleteCustomer';

jest.mock('../../../utils/session-storage', () => ({
  __esModule: true,
  getJsonItem: () => ({
    domain: 'https://www.premierinn.com.de-qa.nativ-systems.com',
  }),
}));

describe('DeleteCustomer Component', () => {
  let wrapper;
  const deleteCustomer = jest.fn(() => Promise.resolve({}));

  const props = {
    deleteCustomer,
    profile: {
      sessionId: 'zdiKE1MflNUmdXAS',
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
      ],
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
      companyName: 'Pareto Law',
      companyId: '',
      businessUse: false,
      guestHistoryNumber: 'G14187551',
    },
    dictionary: {
      'deletecustomer.title': 'Delete Profile',
      'deletecustomer.description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud',
      'deletecustomer.button': 'Delete Profile',
      'deletecustomer.modal.title': 'Delete Profile',
      'deletecustomer.modal.description': 'Are you sure you want to delete your profile?',
      'deletecustomer.modal.button': 'Delete Profile',
      'deletecustomer.modal.cancel': 'Cancel changes',
    },
    closeModal: jest.fn(),
    openModal: jest.fn(),
  };

  const config = {
    deleteProfileLink: '/gb/en/profile-deleted.html',
  };

  const { openModal } = props;

  beforeEach(() => {
    wrapper = shallow(<DeleteCustomer {...props} {...config} />);
  });
  afterEach(() => {
    deleteCustomer.mockClear();
  });

  describe('Renders DeleteCustomer Component Elements', () => {
    it('should render the component', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should open the delete profile modal on click', () => {
      wrapper.find('[data-test="delete-customer"]').simulate('click');
      expect(openModal).toHaveBeenCalledTimes(1);
    });
  });

  describe('Trigger the correct actions', () => {
    it('should delete customer profile and redirect on click', async () => {
      HeaderInterface.userLogOut = jest.fn();
      props.openModal = jest.fn(({ props: { deleteFunc } }) => deleteFunc());
      wrapper = shallow(<DeleteCustomer {...props} />);
      wrapper.find('[data-test="delete-customer"]').simulate('click');
      await Promise.all([deleteCustomer]);

      expect(props.closeModal).toHaveBeenCalledTimes(1);
      expect(HeaderInterface.userLogOut)
        .toHaveBeenCalledWith(HeaderInterface.LOG_OUT_REASONS.DELETE_PROFILE);
    });
  });
});
