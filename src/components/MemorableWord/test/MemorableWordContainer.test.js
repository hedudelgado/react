import { shallow } from 'enzyme';
import React from 'react';
import configureStore from 'redux-mock-store';
import MemorableWordContainer from '../MemorableWordContainer';
import {
  MEMORABLE_WORD_VIEW,
  SET_NOTIFICATION_MESSAGE,
} from '../../App/appActions';

const mockedStore = configureStore();
const dictionary = {};
const userProfile = { profile: {} };
const app = {};
const defaultProps = {
  app,
  dictionary,
  userProfile,
  setNotificationMessage: jest.fn(),
};

const store = mockedStore({ ...defaultProps });
store.dispatch = jest.fn();
const wrapper = shallow(<MemorableWordContainer store={store} {...defaultProps} />);

describe('Memorable Word container', () => {
  it('should expose the correct props', () => {
    expect(wrapper)
      .toHaveProp({
        app,
        dictionary,
        userProfile,
      })
      .toHaveProp('setNotificationMessage');
  });

  it('should dispatch setNotificationMessage', () => {
    wrapper.props().setNotificationMessage(MEMORABLE_WORD_VIEW);
    expect(store.dispatch)
      .toHaveBeenCalledWith({
        type: SET_NOTIFICATION_MESSAGE,
        notificationMessage: MEMORABLE_WORD_VIEW,
      });
  });
});
