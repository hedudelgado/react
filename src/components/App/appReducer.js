import {
  SET_NOTIFICATION_MESSAGE, SET_EDIT_VIEW, DEFAULT_VIEW,
} from './appActions';

const defaultState = {
  editViewName: DEFAULT_VIEW,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_EDIT_VIEW:
      return {
        ...state,
        editViewName: action.editViewName,
      };
    case SET_NOTIFICATION_MESSAGE:
      return {
        ...state,
        notificationMessage: action.notificationMessage,
      };
    default:
      return state;
  }
};
