import React from 'react';
import { shallow } from 'enzyme';
import RoomRequirementsForm from '../RoomRequirementsForm';
import { DEFAULT_VIEW } from '../../App/appActions';

describe('RoomRequirementsForm Component', () => {
  let wrapper;

  const props = {
    touched: {},
    dictionary: {
      'roomrequirements.title.edit': 'Edit room requirements',
      'roomrequirements.button.cancel': 'Cancel changes',
      'roomrequirements.button.save': 'Save changes',
      'roomrequirements.type.double': 'Double',
      'roomrequirements.type.single': 'Single',
      'roomrequirements.type.accessible': 'Accessible',
      'roomrequirements.type.family': 'Family',
    },
    roomRequirements: {
      adults: [1, 2],
      children: [0, 1, 2],
      type: [
        {
          dictionaryKey: 'roomrequirements.type.double',
          code: 'DB',
        },
        {
          dictionaryKey: 'roomrequirements.type.accessible',
          code: 'DIS',
        },
        {
          dictionaryKey: 'roomrequirements.type.family',
          code: 'FAM',
        },
        {
          dictionaryKey: 'roomrequirements.type.single',
          code: 'SB',
        },
      ],
    },
    profile: {
      bookingPreference: {
        roomRequirements: {
          type: 'DB',
          adults: 2,
          children: 0,
          cotRequired: false,
          hotelBrand: 'PI',
        },
      },
    },
    setEditView: jest.fn(),
    handleBlur: jest.fn(),
    handleChange: jest.fn(),
    handleSubmit: jest.fn(),
    setFieldValue: jest.fn(),
    values: {
      adults: 0,
      children: 2,
      cotRequired: false,
      type: 'DB',
    },
  };

  beforeEach(() => {
    wrapper = shallow(<RoomRequirementsForm {...props} />);
  });

  describe('Renders RoomRequirementsForm Component Elements', () => {
    it('should render the component', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should go back to default view on Cancel', () => {
      wrapper.find('[data-test="closeForm"]').simulate('click');
      expect(props.setEditView).toHaveBeenCalledWith(DEFAULT_VIEW);
    });

    it('should submit the form', () => {
      wrapper.find('[name="room-requirements-form"]').simulate('submit');
      expect(props.handleSubmit).toHaveBeenCalledTimes(1);
    });

    it('should select Family room type if 1 or more children have been selected', () => {
      const event = { target: { value: 2 } };
      wrapper.find('[name="children"]').simulate('change', event);
      expect(wrapper.find('[name="type"]').dive().find('option[value="FAM"]')).toHaveLength(1);
      expect(wrapper.find('[name="type"]').dive().find('option[value="DB"]')).toHaveLength(0);
    });

    it('should not select Family room type if 0 children have been selected', () => {
      const newprops = {
        ...props,
        values: {
          adults: 0,
          children: 0,
          cotRequired: false,
          type: 'DB',
        },
      };

      wrapper = shallow(<RoomRequirementsForm {...newprops} />);

      const event = { target: { value: 0 } };
      wrapper.find('[name="children"]').simulate('change', event);
      expect(wrapper.find('[name="type"]').dive().find('option[value="FAM"]')).toHaveLength(0);
    });

    it('should select Double room type if multiple adults have been selected', () => {
      const newprops = {
        ...props,
        values: {
          adults: 2,
          children: 0,
          cotRequired: false,
          type: 'DB',
        },
      };

      wrapper = shallow(<RoomRequirementsForm {...newprops} />);

      const event = { target: { value: 2 } };
      wrapper.find('[name="adults"]').simulate('change', event);
      expect(wrapper.find('[name="type"]').dive().find('option[value="FAM"]')).toHaveLength(0);
      expect(wrapper.find('[name="type"]').dive().find('option[value="SB"]')).toHaveLength(0);
      expect(wrapper.find('[name="type"]').dive().find('option[value="DB"]')).toHaveLength(1);
    });

    it('should select Double room type if multiple adults have been selected but not allow Single', () => {
      const newprops = {
        ...props,
        values: {
          adults: 1,
          children: 0,
          cotRequired: false,
          type: 'DB',
        },
      };

      wrapper = shallow(<RoomRequirementsForm {...newprops} />);

      const event = { target: { value: 1 } };
      wrapper.find('[name="adults"]').simulate('change', event);
      expect(wrapper.find('[name="type"]').dive().find('option[value="FAM"]')).toHaveLength(0);
      expect(wrapper.find('[name="type"]').dive().find('option[value="SB"]')).toHaveLength(1);
      expect(wrapper.find('[name="type"]').dive().find('option[value="DB"]')).toHaveLength(1);
    });
  });
});
