import React from 'react';
import { shallow } from 'enzyme';

import AddressForm from '../AddressForm';
import { getAddressList } from '../../../utils/api';

jest.mock('../../../utils/api', () => ({
  __esModule: true,
  getAddressList: jest.fn(() => Promise.resolve([
    {
      postcode: 'EC1N 2TD',
      label: 'Brainbow Ltd, 120 Holborn, LONDON, EC1N 2TD',
      line1: '120 Holborn',
      line4: 'LONDON',
      country: 'GB',
      companyName: 'Brainbow Ltd',
    },
    {
      postcode: 'EC1N 2TD',
      label: 'North Highland, 120 Holborn, LONDON, EC1N 2TD',
      line1: '120 Holborn',
      line4: 'LONDON',
      country: 'GB',
      companyName: 'North Highland',
    },
    {
      postcode: 'EC1N 2TD',
      label: 'North Highland UK (Holdings) Ltd, 120 Holborn, LONDON, EC1N 2TD',
      line1: '120 Holborn',
      line4: 'LONDON',
      country: 'GB',
      companyName: 'North Highland UK (Holdings) Ltd',
    },
    {
      postcode: 'NW2 3AN',
      label: '27a Chichele Road, LONDON, NW2 3AN',
      line1: '27a Chichele Road',
      line4: 'LONDON',
      country: 'GB',
    },
  ])),
}));


describe('AddressForm Component', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      selectedImage: jest.fn(),
      setFieldValue: jest.fn(),
      handleBlur: jest.fn(),
      handleChange: jest.fn(),
      dictionary: {
        'profile.radio.address.home': 'Home address',
        'profile.radio.address.business': 'Business address',
        'profile.button.findpostcode': 'Find new address',
      },
      errors: {},
      touched: {},
      values: {
        countryCode: 'GB',
        type: 'HOME',
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
    };
    wrapper = shallow(<AddressForm {...props} />);
  });

  describe('Renders AddressForm Element', () => {
    it('should render the component', () => {
      expect(wrapper).not.toBeEmptyRender();
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should display the two address radio buttons', () => {
      expect(wrapper.find('RadioGroup [id$="Address"]')).toHaveLength(2);
    });

    it('should not display the company name field for home addresses', () => {
      expect(wrapper.find('[name="companyName"]')).toHaveLength(0);
    });

    it('should display the company name field for business addresses', () => {
      const type = 'BUSINESS';
      const businessProps = {
        ...props,
        values: {
          ...props.values,
          type,
        },
      };

      wrapper = shallow(<AddressForm {...businessProps} />);
      expect(wrapper.find('[name="companyName"]')).toHaveLength(1);
    });
  });

  describe('Gets list of addresses and updates state', () => {
    it('should not display addressList when addressList is empty', () => {
      expect(wrapper.find('#addressList')).toHaveLength(0);
    });

    it('should display addressList', async () => {
      wrapper.find('[data-test="find-postcode"]').simulate('click');
      await Promise.all([getAddressList]).then(() => {
        expect(wrapper.state().addressList).toHaveLength(4);
        expect(wrapper.state().addressListOptions).toHaveLength(4);
      });
    });

    it('should display addressList when addressList is empty', async () => {
      wrapper.find('[data-test="find-postcode"]').simulate('click');
      await Promise.all([getAddressList]).then(() => {
        expect(wrapper.find('#addressList'))
          .toHaveLength(1);
      });
    });

    it('should update addressFields when user selects a company address from dropdown', async () => {
      const event = { target: { value: '1' } };
      wrapper.find('[data-test="find-postcode"]').simulate('click');
      await Promise.all([getAddressList]).then(() => {
        wrapper.find('#addressList').simulate('change', event);
        expect(props.setFieldValue)
          .toHaveBeenNthCalledWith(1, 'line1', '120 Holborn')
          .toHaveBeenNthCalledWith(2, 'line2', '')
          .toHaveBeenNthCalledWith(3, 'line3', '')
          .toHaveBeenNthCalledWith(4, 'line4', 'LONDON')
          .toHaveBeenNthCalledWith(5, 'postCode', 'EC1N 2TD')
          .toHaveBeenNthCalledWith(6, 'countryCode', 'GB')
          .toHaveBeenNthCalledWith(7, 'companyName', 'North Highland');
      });
    });

    it('should update addressFields when user selects a house address from dropdown', async () => {
      const event = { target: { value: '3' } };
      wrapper.find('[data-test="find-postcode"]').simulate('click');
      await Promise.all([getAddressList]).then(() => {
        wrapper.find('#addressList').simulate('change', event);
        expect(props.setFieldValue)
          .toHaveBeenNthCalledWith(1, 'line1', '27a Chichele Road')
          .toHaveBeenNthCalledWith(2, 'line2', '')
          .toHaveBeenNthCalledWith(3, 'line3', '')
          .toHaveBeenNthCalledWith(4, 'line4', 'LONDON')
          .toHaveBeenNthCalledWith(5, 'postCode', 'NW2 3AN')
          .toHaveBeenNthCalledWith(6, 'countryCode', 'GB')
          .toHaveBeenNthCalledWith(7, 'companyName', '');
      });
    });
  });

  describe('Manages the Address Select placeholder', () => {
    it('should stop the execution if the default placeholder is somehow selected', () => {
      const event = { target: { value: 'default' } };
      expect(wrapper.instance().handleAddressChange(event)).toBe(undefined);
    });

    it('should disable the placeholder option if a real selection has been made', async () => {
      const event = { target: { value: '3' } };
      wrapper.find('[data-test="find-postcode"]').simulate('click');
      await Promise.all([getAddressList]).then(() => {
        wrapper.find('#addressList').simulate('change', event);
        expect(wrapper.state().disableSelectDefault).toBe(true);
      });
    });
  });
});
