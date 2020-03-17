import jstz from 'jstimezonedetect';
import {
  NEWSLETTER_RECEIVED,
  NEWSLETTER_UPDATED,
  PROFILE_RECEIVED,
  SET_EDIT_VIEW,
  SET_NOTIFICATION_MESSAGE,
} from '../../components/App/appActions';
import { getHost } from '../window';

const getEnvironment = () => {
  const host = getHost();
  if (host.indexOf('nativ-systems') > 0) return 'UAT';
  if (host.indexOf('digital') > 0) return 'ODE';
  return 'PROD';
};

export const initAnalytics = ({ language }) => {
  window.analyticsData = {
    language,
    pageType: 'account',
    siteType: 'AEM 5.6',
    currencyCode: 'gbp',
    userLoggedIn: 'not logged-in',
    userID: '',
    environment: getEnvironment(),
    pageURL: window.location.href,
    pageName: window.location.href.split('/').pop(),
    browserTimeZone: jstz.determine().name().toLowerCase(),
  };
};

const trackEvent = (event) => {
  const { _satellite: { track } = {} } = window;
  if (track) track(event);
};

const analytics = () => next => (action) => {
  const { analyticsData } = window;

  switch (action.type) {
    case SET_EDIT_VIEW:
      analyticsData.settingName = action.editViewName;
      if (action.editViewName) {
        trackEvent('settingView');
      }
      break;
    case SET_NOTIFICATION_MESSAGE:
      if (action.notificationMessage && action.notificationMessage.indexOf('ERROR') === -1) {
        analyticsData.updated = action.notificationMessage;
        trackEvent('settingUpdated');
      }
      break;
    case PROFILE_RECEIVED:
      analyticsData.userID = action.profile.guestHistoryNumber;
      analyticsData.userLoggedIn = 'logged-in';
      trackEvent('general');
      break;
    case NEWSLETTER_RECEIVED:
      analyticsData.optIn = action.newsletter.regionSubscriptions;
      break;
    case NEWSLETTER_UPDATED:
      analyticsData.optIn = action.newsletter.regionSubscriptions;
      break;
    default:
      break;
  }

  return next(action);
};

export default analytics;
