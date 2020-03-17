import { HeaderInterface, InvalidSessionErrorCodeMap, InvalidSessionHelper } from 'mega-code';
import {
  getCountries,
  getNewsletterRegions,
  getNewsletterPreferences,
  getProfile,
  updateProfile,
  deleteCustomer,
} from '../../utils/api';

// actions
export const USER_LOGGED_IN_SUCCESSFULLY = 'USER_LOGGED_IN_SUCCESSFULLY';
export const COUNTRIES_RECEIVED = 'COUNTRIES_RECEIVED';
export const PROFILE_RECEIVED = 'PROFILE_RECEIVED';
export const REGIONS_RECEIVED = 'REGIONS_RECEIVED';
export const NEWSLETTER_RECEIVED = 'NEWSLETTER_RECEIVED';
export const SET_EDIT_VIEW = 'SET_EDIT_VIEW';
export const SET_NOTIFICATION_MESSAGE = 'SET_NOTIFICATION_MESSAGE';
export const PROFILE_UPDATED = 'PROFILE_UPDATED';
export const NEWSLETTER_UPDATED = 'NEWSLETTER_UPDATED';
export const RESET_NEWSLETTER_INFO = 'RESET_NEWSLETTER_INFO';
export const RESET_USER_INFO = 'RESET_USER_INFO';
// views
export const DEFAULT_VIEW = undefined;
export const USER_DETAILS_VIEW = 'USER_DETAILS_VIEW';
export const PASSWORD_VIEW = 'PASSWORD_VIEW';
export const PAYMENT_CARD_VIEW = 'PAYMENT_CARD_VIEW';
export const ADD_GUEST_VIEW = 'ADD_GUEST_VIEW';
export const REGULAR_GUESTS_VIEW = 'REGULAR_GUESTS_VIEW';
export const NEWSLETTER_VIEW = 'NEWSLETTER_VIEW';
export const ROOM_REQUIREMENTS_VIEW = 'ROOM_REQUIREMENTS_VIEW';
export const EXTRAS_PREFERENCES_VIEW = 'EXTRAS_PREFERENCES_VIEW';
export const MEMORABLE_WORD_VIEW = 'MEMORABLE_WORD_VIEW';
// errors
export const PROFILE_ERROR = 'PROFILE_ERROR';
export const PASSWORD_ERROR = 'PASSWORD_ERROR';
export const NEWSLETTER_ERROR = 'NEWSLETTER_ERROR';
export const PAYMENT_CARD_ERROR = 'PAYMENT_CARD_ERROR';
export const USER_DETAILS_ERROR = 'USER_DETAILS_ERROR';
export const REGULAR_GUESTS_ERROR = 'REGULAR_GUESTS_ERROR';
export const MEMORABLE_WORD_ERROR = 'MEMORABLE_WORD_ERROR';
export const ROOM_REQUIREMENTS_ERROR = 'ROOM_REQUIREMENTS_ERROR';
export const EXTRAS_PREFERENCES_ERROR = 'EXTRAS_PREFERENCES_ERROR';

const checkForInvalidSession = (error, config, dispatch) => {
  if (InvalidSessionHelper
    .isSessionExpired(error, config)) {
    dispatch({
      type: RESET_USER_INFO,
    });
    dispatch({
      type: RESET_NEWSLETTER_INFO,
    });
    HeaderInterface.userLogOut(HeaderInterface.LOG_OUT_REASONS.SESSION_EXPIRED);
  }
};

export const getSettings = (email, sessionId, business) => (dispatch, getState) => {
  getProfile(email, sessionId, business).then((profile) => {
    dispatch({
      type: PROFILE_RECEIVED,
      profile,
    });
  }).catch((error) => {
    checkForInvalidSession(error, InvalidSessionErrorCodeMap.ACCOUNT.invalidSession, dispatch);
    dispatch({
      type: PROFILE_ERROR,
      error,
    });
  });
  getCountries()
    .then((countries) => {
      dispatch({
        type: COUNTRIES_RECEIVED,
        countries,
      });
    });
  if (getState().application.showEmailPreferences) {
    getNewsletterRegions()
      .then((regions) => {
        dispatch({
          type: REGIONS_RECEIVED,
          regions,
        });
      });

    getNewsletterPreferences(email)
      .then((newsletter) => {
        dispatch({
          type: NEWSLETTER_RECEIVED,
          newsletter,
        });
      })
      .catch(e => dispatch({
        type: NEWSLETTER_ERROR,
        error: e,
      }));
  }
};

export const updateUserProfile = payload => dispatch => updateProfile(payload).catch((error) => {
  checkForInvalidSession(error, InvalidSessionErrorCodeMap.ACCOUNT.invalidSession, dispatch);
  return Promise.reject(error);
});

export const deleteUserProfile = payload => dispatch => deleteCustomer(payload).catch((error) => {
  checkForInvalidSession(error, InvalidSessionErrorCodeMap.DELETE_PROFILE.invalidSession, dispatch);
  return Promise.reject(error);
});

export default {
  getSettings,
};
