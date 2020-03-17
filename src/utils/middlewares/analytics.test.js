import analytics, { initAnalytics } from './analytics';
import {
  DEFAULT_VIEW,
  NEWSLETTER_UPDATED,
  NEWSLETTER_RECEIVED,
  NEWSLETTER_VIEW,
  PROFILE_RECEIVED,
  SET_EDIT_VIEW, SET_NOTIFICATION_MESSAGE,
  USER_DETAILS_VIEW,
} from '../../components/App/appActions';
import { getHost } from '../window';

jest.mock('../window', () => ({
  __esModule: true,
  getHost: jest.fn(() => 'localhost'),
}));

const create = () => {
  const store = {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn(),
  };
  const next = jest.fn();

  const invoke = action => analytics(store)(next)(action);

  return { store, next, invoke };
};

window._satellite = {
  track: jest.fn(),
};

describe('Analytics Middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.analyticsData = {};
  });

  it('initiates analyticsData object in window', () => {
    initAnalytics({ language: 'en' });
    expect(window.analyticsData).toEqual({
      language: 'en',
      pageType: 'account',
      siteType: 'AEM 5.6',
      currencyCode: 'gbp',
      userID: '',
      userLoggedIn: 'not logged-in',
      environment: 'PROD',
      pageURL: 'http://localhost/',
      pageName: '',
      browserTimeZone: 'europe/london',
    });
  });

  it('adds logged in user data when PROFILE_RECEIVED is dispatched', () => {
    const { _satellite: { track } = {} } = window;
    const { next, invoke } = create();
    const action = {
      type: PROFILE_RECEIVED,
      profile: { guestHistoryNumber: 'G14187551' },
    };
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
    expect(window.analyticsData)
      .toHaveProperty('userID', 'G14187551')
      .toHaveProperty('userLoggedIn', 'logged-in');
    expect(track).toHaveBeenCalledWith('general');
  });

  it('tracks component edit view action', () => {
    const { _satellite: { track } = {} } = window;
    const { next, invoke } = create();
    const action = {
      type: SET_EDIT_VIEW,
      editViewName: USER_DETAILS_VIEW,
    };
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
    expect(window.analyticsData).toHaveProperty('settingName', USER_DETAILS_VIEW);
    expect(track).toHaveBeenCalledWith('settingView');
  });

  it('does not track component cancel edit view action', () => {
    const { _satellite: { track } = undefined } = window;
    const { next, invoke } = create();
    const action = {
      type: SET_EDIT_VIEW,
      editViewName: undefined,
    };
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
    expect(window.analyticsData).toHaveProperty('settingName', undefined);
    expect(track).not.toHaveBeenCalled();
  });

  it('tracks component update success action', () => {
    const { _satellite: { track } = {} } = window;
    const { next, invoke } = create();
    const action = {
      type: SET_NOTIFICATION_MESSAGE,
      notificationMessage: NEWSLETTER_VIEW,
    };
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
    expect(window.analyticsData).toHaveProperty('updated', NEWSLETTER_VIEW);
    expect(track).toHaveBeenCalledWith('settingUpdated');
  });

  it('should not track when removing success message', () => {
    const { _satellite: { track } = {} } = window;
    const { next, invoke } = create();
    const action = {
      type: SET_NOTIFICATION_MESSAGE,
      notificationMessage: DEFAULT_VIEW,
    };
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
    expect(track).not.toHaveBeenCalled();
  });

  it('adds optIn object to window when newsletter is updated', () => {
    const { next, invoke } = create();
    const action = {
      type: NEWSLETTER_UPDATED,
      newsletter: { regionSubscriptions: [] },
    };
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
    expect(window.analyticsData).toHaveProperty('optIn', []);
  });

  it('adds optIn object to window when newsletter is received', () => {
    const { next, invoke } = create();
    const regionSubscriptions = [{
      regionId: '1',
      subscribed: true,
    },
    {
      regionId: '2',
      subscribed: true,
    }];
    const action = {
      type: NEWSLETTER_RECEIVED,
      newsletter: {
        regionSubscriptions,
      },
    };
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
    expect(window.analyticsData).toHaveProperty('optIn', regionSubscriptions);
  });

  it('track should not be called if satelite is undefined', () => {
    const spy = jest.spyOn(window._satellite, 'track');
    window._satellite = undefined;
    const { next, invoke } = create();
    const action = {
      type: SET_EDIT_VIEW,
      editViewName: USER_DETAILS_VIEW,
    };
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should execute without TypeError exception when _satellite is not available', () => {
    delete window._satellite;
    const { next, invoke } = create();
    const action = { type: SET_EDIT_VIEW };
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  [{ host: 'anything.nativ-systems.com', environment: 'UAT' },
    { host: 'anything.whitbread.digital', environment: 'ODE' },
    { host: 'premierinn.com', environment: 'PROD' },
    { host: 'premierinn.de', environment: 'PROD' },
  ].forEach(({ host, environment }) => {
    it(`sets correct environment for host: ${host} - ${environment}`, () => {
      getHost.mockImplementationOnce(jest.fn(() => host));
      initAnalytics({ language: 'en' });
      expect(window.analyticsData).toHaveProperty('environment', environment);
    });
  });

  it('should always execute the action regardless of type', () => {
    const { next, invoke } = create();
    const action = { type: 'RANDOM' };
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
  });
});
