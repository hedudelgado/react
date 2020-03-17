import { shallow } from 'enzyme/build';
import React from 'react';
import configureStore from 'redux-mock-store';
import RegularGuestsContainer from '../RegularGuestsContainer';
import {
  DEFAULT_VIEW,
  SET_EDIT_VIEW, SET_NOTIFICATION_MESSAGE,
} from '../../App/appActions';

jest.mock('../../App/modalActions', () => ({
  __esModule: true,
  openModal: () => ({
    type: 'MODAL_OPEN',
  }),
  closeModal: () => ({
    type: 'MODAL_CLOSE',
  }),
}));

const mockedStore = configureStore();
const dictionary = {};
const userProfile = { profile: {} };
const app = {};

const defaultProps = {
  dictionary,
  userProfile,
  app,
  toggleEditView: jest.fn(),
  setEditView: jest.fn(),
  openModal: jest.fn(),
  closeModal: jest.fn(),
};

const store = mockedStore({ ...defaultProps });
store.dispatch = jest.fn();
const wrapper = shallow(<RegularGuestsContainer store={store} {...defaultProps} />);

describe('App container', () => {
  it('should expose the correct props', () => {
    expect(wrapper)
      .toHaveProp({
        dictionary,
        userProfile,
        app,
      });
  });

  it('should dispatch setEditView', () => {
    wrapper.props()
      .setEditView('test');
    expect(store.dispatch)
      .toHaveBeenCalledWith({ type: SET_EDIT_VIEW, editViewName: 'test' });
  });

  it('should dispatch toggleEditView', () => {
    wrapper.props()
      .toggleEditView();
    expect(store.dispatch)
      .toHaveBeenCalledWith({ type: SET_EDIT_VIEW, editViewName: 'REGULAR_GUESTS_VIEW_0' });
  });
  it('should dispatch hideSuccessMessage', () => {
    wrapper.props()
      .hideSuccessMessage();
    expect(store.dispatch)
      .toHaveBeenCalledWith({ type: SET_NOTIFICATION_MESSAGE, editViewName: DEFAULT_VIEW });
  });

  it('should dispatch openModal', () => {
    store.dispatch(wrapper.props().openModal());
    expect(store.dispatch).toHaveBeenCalledWith({ type: 'MODAL_OPEN' });
  });

  it('should dispatch closeModal', () => {
    store.dispatch(wrapper.props().closeModal());
    expect(store.dispatch).toHaveBeenCalledWith({ type: 'MODAL_CLOSE' });
  });
});
