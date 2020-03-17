import React from 'react';
import { shallow } from 'enzyme';
import AddRegularGuest from '../AddRegularGuest';

describe('AddRegularGuest Component', () => {
  let wrapper;

  const props = {
    dictionary: {
      'guests.button.add': 'Add regular guest',
      'guests.button.cancel': 'Cancel changes',
    },
    setEditView: jest.fn(),
    setNotificationMessage: jest.fn(),
  };

  beforeEach(() => {
    wrapper = shallow(<AddRegularGuest {...props} />);
  });

  describe('Renders AddRegularGuest Component Elements', () => {
    it('should render the component', () => {
      expect(wrapper).not.toBeEmptyRender();
    });

    it('should show the Add Guest Button if the account does not have the max number of regular guests', () => {
      expect(wrapper).toContainExactlyOneMatchingElement('#add-guest');
    });

    it('should trigger setEditView when clicking the add regular guest button', () => {
      wrapper.find('#add-guest').simulate('click');
      expect(props.setEditView).toHaveBeenCalled();
      expect(props.setNotificationMessage).toHaveBeenCalled();
    });
  });
});
