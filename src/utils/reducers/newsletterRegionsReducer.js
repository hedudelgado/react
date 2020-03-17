import { REGIONS_RECEIVED } from '../../components/App/appActions';

export default (state = [], action) => {
  switch (action.type) {
    case REGIONS_RECEIVED:
      return [...action.regions];
    default:
      return state;
  }
};
