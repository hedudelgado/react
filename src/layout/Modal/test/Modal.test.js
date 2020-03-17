import React from 'react';
import { shallow } from 'enzyme';

import Modal from '../Modal';

jest.mock('../../../utils/noop', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('Modal Component', () => {
  const content = 'content';
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Modal content={content} />);
  });

  describe('Rendering', () => {
    it('should show the component', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('handleClose', () => {
    it('should exist', () => {
      expect(Modal.defaultProps.handleClose).toBeDefined();
    });

    it('should be called when closing the modal', () => {
      const handleClose = jest.fn();
      const handleCloseWrapper = shallow(<Modal display handleClose={handleClose} />);

      handleCloseWrapper.find('[data-test="close-modal"]').simulate('click');

      expect(handleClose).toHaveBeenCalled();
    });
  });
});
