import {
  NEWSLETTER_RECEIVED,
  NEWSLETTER_UPDATED,
  RESET_NEWSLETTER_INFO,
} from '../../components/App/appActions';

const defaultState = {};
export default (state = defaultState, action) => {
  switch (action.type) {
    case NEWSLETTER_RECEIVED:
    case NEWSLETTER_UPDATED:
      return { ...action.newsletter };
    case RESET_NEWSLETTER_INFO:
      return {
        ...defaultState,
      };
    default:
      return state;
  }
};
