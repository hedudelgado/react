import React from 'react';
import {
  element, string, oneOfType, func,
} from 'prop-types';
import BaseStyle from '../BaseStyle';
import Button from '../Button';

import noop from '../../utils/noop';

const Modal = ({
  content,
  handleClose,
}) => (
  <BaseStyle component="div" className="pt3 wb-modal">
    <BaseStyle component="div" className="wb-modal-content">
      <Button
        data-test="close-modal"
        type="button"
        color="default"
        onClick={handleClose}
        className="wb-modal-content-close wb-btn wb-button-reset wb-icon_cross"
      />
      {content}
    </BaseStyle>
  </BaseStyle>
);

Modal.propTypes = {
  content: oneOfType([
    string,
    element,
  ]),
  handleClose: func,
};

Modal.defaultProps = {
  handleClose: noop,
};

export default Modal;
