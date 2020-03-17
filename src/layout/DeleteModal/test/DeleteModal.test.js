import React from 'react';
import { shallow } from 'enzyme';
import DeleteModal from '../DeleteModal';

describe('DeleteModal Component', () => {
  let wrapper;

  const props = {
    dictionary: {
      'guests.delete.title': 'Delete regular guest',
      'guests.delete.subtext': 'Are you sure you want to delete this guest?',
      'guests.delete.button.label': 'Delete guests',
      'guests.cancel.link': 'Cancel changes',
    },
    title: 'Delete guest',
    subtext: 'Are you sure you want to delete this guest?',
    deleteFunc: jest.fn(),
    buttonLabel: 'Delete guest',
    handleClose: jest.fn(),
    cancelLabel: 'Cancel changes',
  };

  beforeEach(() => {
    wrapper = shallow(<DeleteModal {...props} />);
  });

  describe('DeleteModal', () => {
    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should execute the delete function when clicking the delete button', () => {
      wrapper.find('[data-test="delete-button"]').simulate('click');
      expect(props.deleteFunc).toHaveBeenCalled();
    });

    it('should execute the handleClose function when clicking cancel changes button', () => {
      wrapper.find('[data-test="cancel-button"]').simulate('click');
      expect(props.handleClose).toHaveBeenCalled();
    });
  });
});
