import { shallow } from 'enzyme/build';
import React from 'react';
import configureStore from 'redux-mock-store';
import PaymentCardContainer from '../PaymentCardContainer';
import { updateUserProfile } from '../../App/appActions';

jest.mock('../../App/modalActions', () => ({
  __esModule: true,
  openModal: () => ({
    type: 'MODAL_OPEN',
  }),
  closeModal: () => ({
    type: 'MODAL_CLOSE',
  }),
}));

jest.mock('../../App/appActions', () => ({
  __esModule: true,
  updateUserProfile: jest.fn(() => Promise.resolve()),
}));

const mockedStore = configureStore();
const openModal = jest.fn();
const closeModal = jest.fn();
const storeProps = {
  openModal,
  closeModal,
};
const inheritedProps = {
  app: {},
  profile: {},
  dictionary: {},
  setEditView: jest.fn(),
  setNotificationMessage: jest.fn(),
  updateProfileStore: jest.fn(),
};

const store = mockedStore({ ...storeProps });
store.dispatch = jest.fn();
const wrapper = shallow(<PaymentCardContainer {...inheritedProps} store={store} />);

describe('App container', () => {
  it('should expose the correct props', () => {
    expect(wrapper)
      .toHaveProp('openModal')
      .toHaveProp('closeModal')
      .toHaveProp('updateProfile');
  });

  it('should dispatch openModal', () => {
    store.dispatch(wrapper.props().openModal());
    expect(store.dispatch).toHaveBeenCalledWith({ type: 'MODAL_OPEN' });
  });

  it('should dispatch closeModal', () => {
    store.dispatch(wrapper.props().closeModal());
    expect(store.dispatch).toHaveBeenCalledWith({ type: 'MODAL_CLOSE' });
  });

  it('should dispatch updateProfile', () => {
    wrapper.props()
      .updateProfile('profile');
    expect(updateUserProfile)
      .toHaveBeenCalledWith('profile');
  });
});
