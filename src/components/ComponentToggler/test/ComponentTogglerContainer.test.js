import { shallow } from 'enzyme/build';
import React from 'react';
import configureStore from 'redux-mock-store';
import ComponentTogglerContainer from '../ComponentTogglerContainer';
import {
  DEFAULT_VIEW, PROFILE_UPDATED,
  SET_EDIT_VIEW,
  SET_NOTIFICATION_MESSAGE,
  updateUserProfile,
} from '../../App/appActions';

jest.mock('../../App/appActions', () => ({
  __esModule: true,
  updateUserProfile: jest.fn(() => Promise.resolve()),
}));

const mockedStore = configureStore();
const app = {};
const defaultProps = {
  app,
  viewName: 'test',
  userProfile: { profile: {} },
  edit: () => <p>edit</p>,
  view: () => <p>view</p>,
  setEditView: jest.fn(),
  setNotificationMessage: jest.fn(),
  updateProfileStore: jest.fn(),
};

const store = mockedStore({ ...defaultProps });
store.dispatch = jest.fn();
const wrapper = shallow(<ComponentTogglerContainer store={store} {...defaultProps} />);

describe('ComponentToggler container', () => {
  it('should expose the correct props', () => {
    expect(wrapper)
      .toHaveProp({
        app,
      })
      .toHaveProp('setEditView')
      .toHaveProp('setNotificationMessage')
      .toHaveProp('updateProfile');
  });

  it('should dispatch setEditView', () => {
    wrapper.props()
      .setEditView('test');
    expect(store.dispatch)
      .toHaveBeenCalledWith({ type: SET_EDIT_VIEW, editViewName: 'test' });
  });
  it('should dispatch setNotificationMessage', () => {
    wrapper.props()
      .setNotificationMessage();
    expect(store.dispatch)
      .toHaveBeenCalledWith({ type: SET_NOTIFICATION_MESSAGE, editViewName: DEFAULT_VIEW });
  });
  it('should dispatch updateProfileStore', () => {
    wrapper.props()
      .updateProfileStore('profile');
    expect(store.dispatch)
      .toHaveBeenCalledWith({ type: PROFILE_UPDATED, profile: 'profile' });
  });
  it('should dispatch updateProfile', () => {
    wrapper.props()
      .updateProfile('profile');
    expect(updateUserProfile)
      .toHaveBeenCalledWith('profile');
  });
});
