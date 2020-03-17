import reducer from './newsletterPreferencesReducer';
import { NEWSLETTER_RECEIVED, RESET_NEWSLETTER_INFO } from '../../components/App/appActions';

const newsletter = {
  emailAddress: 'fresh@mailinator.com',
  regionSubscriptions: [
    {
      regionId: 1,
      subscribed: true,
    },
    {
      regionId: 2,
      subscribed: false,
    },
    {
      regionId: 3,
      subscribed: true,
    },
  ],
};

const defaultState = {};

describe('Newsletter Preferences Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(defaultState);
  });

  it('should set the state with passed object', () => {
    expect(reducer(undefined, { type: NEWSLETTER_RECEIVED, newsletter })).toEqual(newsletter);
  });

  it('should reset the state', () => {
    expect(reducer(undefined, { type: RESET_NEWSLETTER_INFO })).toEqual(defaultState);
  });
});
