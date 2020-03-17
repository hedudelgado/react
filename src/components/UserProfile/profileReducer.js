import {
  PROFILE_UPDATED,
  PROFILE_RECEIVED, RESET_USER_INFO,
} from '../App/appActions';

const defaultState = {
  userDataReceived: false,
  profile: { business: false },
};

export default (state = defaultState, { type, profile }) => {
  switch (type) {
    case PROFILE_UPDATED:
      return {
        ...state,
        profile,
      };
    case PROFILE_RECEIVED:
      return {
        ...state,
        profile,
        userDataReceived: true,
      };
    case RESET_USER_INFO:
      return {
        ...defaultState,
      };
    default:
      return state;
  }
};
