import React from 'react';
import { shallow } from 'enzyme';
import {
  DEFAULT_VIEW,
  PAYMENT_CARD_ERROR,
  PAYMENT_CARD_VIEW,
} from '../../App/appActions';
import PaymentCard from '../PaymentCard';
import Typography from '../../../layout/Typography';

jest.mock('../../../utils/session-storage', () => ({
  __esModule: true,
  getJsonItem: (key) => {
    switch (key) {
      case 'domain':
        return 'https://www.premierinn.com';

      default:
        return '';
    }
  },
}));

describe('PaymentCard Component', () => {
  const updateProfile = jest.fn(() => Promise.resolve({}));
  let wrapper;

  const props = {
    updateProfile,
    profile: {
      paymentPreference: {
        electronicInvoiceRequired: true,
        paymentCard: {
          cardType: 'VI',
          cardNumber: '************1111',
          expiryDate: '07/23',
          cardHolderName: 'dwa',
        },
      },
    },
    dictionary: {
      'update.success.message': 'Your details have been updated successfully!',
      'payment.nocard': 'Save your card details for quicker, easier booking next time.',
      'payment.button.add': 'Add payment card',
      'payment.button.delete': 'Delete card',
      'payment.button.addnew': 'Add new card',
      'payment.expirydate': 'Expiry date',
      'payment.expired': 'This card has expired.',
      'payment.title': 'Payment',
      'payment.delete.title': 'Delete payment method',
      'payment.delete.text': 'Are you sure you want to delete this payment method?',
      'payment.delete.button': 'Delete payment card',
    },
    app: {},
    setEditView: jest.fn(),
    setNotificationMessage: jest.fn(),
    openModal: jest.fn(),
    closeModal: jest.fn(),
    updateProfileStore: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = shallow(<PaymentCard {...props} />);
  });

  describe('Renders PaymentCard Component Elements', () => {
    it('should render the component', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render the edit card button', () => {
      expect(wrapper.find('#edit-card')).toHaveLength(1);
    });

    it('should show success message when payment card updated successfully', () => {
      const copyProps = {
        ...props,
        app: { editViewName: DEFAULT_VIEW, notificationMessage: PAYMENT_CARD_VIEW },
      };
      wrapper = shallow(<PaymentCard {...copyProps} />);
      expect(wrapper).toContainExactlyOneMatchingElement('[data-test="success-message"]');
    });

    it('should show error notification', () => {
      const copyProps = {
        ...props,
        app: { editViewName: DEFAULT_VIEW, notificationMessage: PAYMENT_CARD_ERROR },
      };
      wrapper = shallow(<PaymentCard {...copyProps} />);
      expect(wrapper).toContainExactlyOneMatchingElement('[data-test="error-notification"]');
    });

    it('should show card expired message when card expiry date is in the past', () => {
      const copyProps = {
        ...props,
        profile: {
          paymentPreference: {
            paymentCard: {
              cardType: 'VI',
              cardNumber: '************1111',
              expiryDate: '07/00',
              cardHolderName: 'dwa',
            },
          },
        },
      };
      wrapper = shallow(<PaymentCard {...copyProps} />);
      expect(wrapper.contains(<div className="wb-notification-text">This card has expired.</div>)).toBeTruthy();
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should show no card message', () => {
      const copyProps = {
        ...props,
        profile: {
          paymentPreference: {},
        },
      };
      wrapper = shallow(<PaymentCard {...copyProps} />);
      expect(wrapper.contains(
        <Typography mb="3" data-test="no-guests-message">
          Save your card details for quicker, easier booking next time.
        </Typography>,
      )).toBeTruthy();
    });
  });

  describe('Triggers the correct actions', () => {
    it('should trigger setEditView when clicking the change password button', () => {
      wrapper.find('#edit-card').simulate('click');
      expect(props.setEditView).toHaveBeenCalled();
      expect(props.setNotificationMessage).toHaveBeenCalled();
    });

    it('should open the delete modal on click', () => {
      wrapper.find('[data-test="deleteCard"]').simulate('click');
      expect(props.openModal).toHaveBeenCalledTimes(1);
    });

    it('should set ERROR notification if api fails', async () => {
      updateProfile.mockImplementationOnce(jest.fn(() => Promise.reject({})));
      props.openModal = jest.fn(({ props: { deleteFunc } }) => deleteFunc());
      wrapper = shallow(<PaymentCard {...props} />);
      wrapper.find('[data-test="deleteCard"]').simulate('click');
      expect(props.openModal).toHaveBeenCalledTimes(1);

      await Promise.all([updateProfile]).then(() => {
        expect(props.setNotificationMessage)
          .toHaveBeenCalledTimes(1)
          .toHaveBeenCalledWith(PAYMENT_CARD_ERROR);
        expect(props.updateProfileStore).not.toHaveBeenCalled();
      });
    });

    it('should delete payment card', async () => {
      props.openModal = jest.fn(({ props: { deleteFunc } }) => deleteFunc());
      wrapper = shallow(<PaymentCard {...props} />);
      wrapper.find('[data-test="deleteCard"]').simulate('click');
      expect(props.openModal).toHaveBeenCalledTimes(1);

      await Promise.all([updateProfile]).then(() => {
        expect(updateProfile).toHaveBeenCalledTimes(1);
        expect(updateProfile).toHaveBeenCalledWith({
          paymentPreference: {
            electronicInvoiceRequired: true,
            paymentCard: {},
          },
        });
      });

      expect(props.closeModal).toHaveBeenCalledTimes(1);
      expect(props.setNotificationMessage).toHaveBeenCalledTimes(1);
      expect(props.updateProfileStore).toHaveBeenCalledTimes(1);
      expect(props.updateProfileStore).toHaveBeenCalledWith({
        paymentPreference: {
          electronicInvoiceRequired: true,
          paymentCard: {},
        },
      });
    });
  });

  describe('PaymentCard form default values', () => {
    it('should default to add payment card view ', () => {
      const paymentCardProps = {
        ...props,
      };

      delete paymentCardProps.profile.paymentPreference;

      const paymentCardWrapper = shallow(<PaymentCard {...paymentCardProps} />);
      expect(paymentCardWrapper).toMatchSnapshot();
    });
  });
});
