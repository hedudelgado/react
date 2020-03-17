import { shallow } from 'enzyme/build';
import React from 'react';
import configureStore from 'redux-mock-store';
import NewsletterContainer from '../NewsletterContainer';
import {
  NEWSLETTER_VIEW,
  SET_NOTIFICATION_MESSAGE,
  NEWSLETTER_UPDATED,
} from '../../App/appActions';

const mockedStore = configureStore();
const dictionary = {};
const userProfile = {
  profile: {
    contactDetail: {
      email: '',
    },
  },
};
const newsletter = {};
const application = {};
const app = {};
const regions = [];
const defaultProps = {
  app,
  dictionary,
  userProfile,
  regions,
  newsletter,
  application,
  updateNewsletterStore: jest.fn(),
  setNotificationMessage: jest.fn(),
};

const store = mockedStore({ ...defaultProps });
store.dispatch = jest.fn();
const wrapper = shallow(<NewsletterContainer store={store} {...defaultProps} />);

describe('Newsletter container', () => {
  it('should expose the correct props', () => {
    expect(wrapper)
      .toHaveProp({
        app,
        dictionary,
        userProfile,
        regions,
        newsletter,
        application,
      })
      .toHaveProp('updateNewsletterStore')
      .toHaveProp('setNotificationMessage');
  });

  it('should dispatch setNotificationMessage', () => {
    wrapper.props()
      .setNotificationMessage(NEWSLETTER_VIEW);
    expect(store.dispatch)
      .toHaveBeenCalledWith({
        type: SET_NOTIFICATION_MESSAGE,
        notificationMessage: NEWSLETTER_VIEW,
      });
  });

  it('should dispatch updateNewsletterStore', () => {
    wrapper.props()
      .updateNewsletterStore('newsletter');
    expect(store.dispatch)
      .toHaveBeenCalledWith({ type: NEWSLETTER_UPDATED, newsletter: 'newsletter' });
  });
});
