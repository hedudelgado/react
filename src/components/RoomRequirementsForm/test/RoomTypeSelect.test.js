import React from 'react';
import { shallow } from 'enzyme';
import RoomTypeSelect from '../RoomTypeSelect';

describe('RoomTypeSelect Component', () => {
  let wrapper;

  const props = {
    id: 'test',
    name: 'test',
    label: 'label',
    touched: true,
    onChange: jest.fn(),
    onBlur: jest.fn(),
    dictionary: {
      'roomrequirements.cotrequired.true': 'Yes',
      'roomrequirements.cotrequired.false': 'No',
      'roomrequirements.type.double': 'Double',
      'roomrequirements.type.single': 'Single',
      'roomrequirements.type.accessible': 'Accessible',
      'roomrequirements.type.family': 'Family',
    },
    type: [{
      dictionaryKey: 'roomrequirements.type.double',
      code: 'DB',
    },
    {
      dictionaryKey: 'roomrequirements.type.twin',
      code: 'TWIN',
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
    }],
  };

  beforeEach(() => {
    wrapper = shallow(<RoomTypeSelect {...props} />);
  });

  describe('RoomTypeSelect Component Interface', () => {
    it('should render the component', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should only display Family type if 1 or more children has been selected', () => {
      const mockProps = {
        ...props,
        hasChildren: true,
        defaultValue: 'DB',
      };

      wrapper = shallow(<RoomTypeSelect {...mockProps} />);
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.find('option').at(0)).toHaveValue('FAM');
    });

    it('should display every room option except for Family if no children has been selected', () => {
      const newProps = {
        ...props,
        hasChildren: false,
        defaultValue: 'DB',
      };

      wrapper = shallow(<RoomTypeSelect {...newProps} />);
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.find('option').at(0)).not.toHaveValue('FAM');
    });

    it('should display every room option except for Single and Family if multiple adults and no children have been selected', () => {
      const newProps = {
        ...props,
        hasMultipleAdults: true,
        hasChildren: false,
        defaultValue: 'DB',
      };

      wrapper = shallow(<RoomTypeSelect {...newProps} />);
      expect(wrapper).toMatchSnapshot();
      expect(wrapper).not.toContainMatchingElement('option[value="FAM"]');
      expect(wrapper).not.toContainMatchingElement('option[value="SB"]');
    });

    it('should display every room option except for Family and Twin if one adults and no children have been selected', () => {
      const newProps = {
        ...props,
        hasMultipleAdults: false,
        hasChildren: false,
        defaultValue: 'DB',
      };

      wrapper = shallow(<RoomTypeSelect {...newProps} />);
      expect(wrapper).toMatchSnapshot();
      expect(wrapper).not.toContainMatchingElement('option[value="FAM"]');
      expect(wrapper).not.toContainMatchingElement('option[value="TWIN"]');
      expect(wrapper).toContainMatchingElement('option[value="SB"]');
    });
  });
});
