import {
  MODAL_OPEN,
  MODAL_CLOSE,
} from './modalActions';

export default (state = {
  display: false,
  content: null,
}, action) => {
  const {
    type,
    content,
  } = action;

  switch (type) {
    case MODAL_OPEN:
      return {
        ...state,
        display: true,
        content,
      };
    case MODAL_CLOSE:
      return {
        ...state,
        display: false,
        content: null,
      };
    default:
      return state;
  }
};
