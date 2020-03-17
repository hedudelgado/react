import React from 'react';
import { mount } from 'enzyme';
import PaymentCardForm from '../PaymentCardForm';

describe('PaymentCardForm Component', () => {
  let wrapper;

  const props = {
    dictionary: {
      'payment.add.prepay': 'test',
    },
    paymentCards: {},
    errors: {},
    touched: {},
    values: {},
    countries: [],
    setFieldTouched: jest.fn(),
    setFieldError: jest.fn(),
    setFieldValue: jest.fn(),
    handleSubmit: jest.fn(),
    handleBlur: jest.fn(),
    handleChange: jest.fn(),
    cancel: jest.fn(),
    handleCardNumberBlur: jest.fn(),
    cardType: '',
    domain: '',
    postCode: '',
    showExpiryDateError: false,
    disableSelectDefaults: {},
  };

  beforeEach(() => {
    wrapper = mount(<PaymentCardForm {...props} />);
    jest.clearAllMocks();
  });

  describe('Renders Payment Card Form Component Elements', () => {
    it('should render the component', () => {
      expect(wrapper).toMatchSnapshot();
    });


    it('should show invalid expiry date error if users interacts with the fields and date is invalid', () => {
      wrapper.setProps({
        touched: {
          expiryMonth: true,
          expiryYear: true,
        },
        showExpiryDateError: true,
      });
      expect(wrapper).toContainExactlyOneMatchingElement('Typography[data-test="expiry-date-error"]');
    });
  });
});
