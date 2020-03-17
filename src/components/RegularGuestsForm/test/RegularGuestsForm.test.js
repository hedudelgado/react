import React from 'react';
import { shallow, mount } from 'enzyme';
import RegularGuestsForm from '../RegularGuestsForm';

jest.mock('../../../utils/selectedFlagImage', () => ({
  __esModule: true,
  selectedFlagImage: jest.fn(),
}));

describe('RegularGuestsForm Component', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      dictionary: {
        'profile.form.guesttitle.list': 'Mr,Mrs,Ms,Miss,Master,Dr,Lord,Lady,Sir,Col,Prof,Rev',
        'guests.button.add': 'Add regular guest',
        'guests.button.save': 'Save guest',
        'guests.button.cancel': 'Cancel changes',
        'guests.form.title.edit': 'Edit regular guest',
        'guests.form.title.add': 'Add regular guest',
      },
      values: {},
      touched: {},
      errors: {},
      disableSelectDefaults: {},
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
      handleBlur: jest.fn(),
      handleSubmit: jest.fn(),
      handleChange: jest.fn(),
      setEditView: jest.fn(),
      passportRequired: false,
      isPassportRequired: jest.fn(),
    };

    wrapper = shallow(<RegularGuestsForm {...props} />);
  });

  describe('Renders Regular Guests Form Component Elements', () => {
    it('should render the component', () => {
      expect(wrapper).not.toBeEmptyRender();
    });

    it('should trigger setEditView when clicking the cancel changes button', () => {
      wrapper = mount(<RegularGuestsForm {...props} />);
      wrapper.find('[data-test="cancel-add-guest"]').simulate('click');
      expect(props.setEditView).toHaveBeenCalled();
    });

    it('should trigger isPassportRequired and handleChange when selecting nationality', () => {
      const event = { target: { value: 'D' } };
      const { isPassportRequired, handleChange } = props;

      wrapper.find('#nationality').simulate('change', event);

      expect(isPassportRequired).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('should not render the passport number field when a commonwealth country is selected', () => {
      expect(wrapper.find('#passportNumber')).toHaveLength(0);
    });

    it('should render the passport number field when a non-commonwealth country is selected', () => {
      const formProps = {
        ...props,
        passportRequired: true,
      };

      wrapper = shallow(<RegularGuestsForm {...formProps} />);

      expect(wrapper.find('#passportNumber')).toHaveLength(1);
    });
  });
});
