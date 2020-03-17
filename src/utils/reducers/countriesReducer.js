import { COUNTRIES_RECEIVED } from '../../components/App/appActions';

export default (state = [], action) => {
  if (action.type === COUNTRIES_RECEIVED) {
    return [...action.countries];
  }

  return state;
};
