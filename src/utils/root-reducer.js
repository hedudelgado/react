import { combineReducers } from 'redux';

import countries from './reducers/countriesReducer';
import dictionary from './reducers/dictionaryReducer';
import application from './reducers/applicationReducer';
import app from '../components/App/appReducer';
import newsletter from './reducers/newsletterPreferencesReducer';
import regions from './reducers/newsletterRegionsReducer';
import { modalReducer as modal } from '../components/App';
import userProfile from '../components/UserProfile/profileReducer';

export default combineReducers({
  countries,
  regions,
  newsletter,
  application,
  dictionary,
  app,
  modal,
  userProfile,
});
