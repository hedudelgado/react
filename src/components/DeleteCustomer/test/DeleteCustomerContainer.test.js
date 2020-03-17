import { shallow } from 'enzyme/build';
import React from 'react';
import configureStore from 'redux-mock-store';
import DeleteCustomerContainer from '../DeleteCustomerContainer';
import { deleteUserProfile } from '../../App/appActions';

jest.mock('../../App/appActions', () => ({
  __esModule: true,
  deleteUserProfile: jest.fn(() => Promise.resolve()),
}));

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
const application = {};
const userProfile = { profile: {} };

const openModal = jest.fn();
const closeModal = jest.fn();
const defaultProps = {
  dictionary,
  application,
  userProfile,
  openModal,
  closeModal,
};

const store = mockedStore({ ...defaultProps });
store.dispatch = jest.fn();
const wrapper = shallow(<DeleteCustomerContainer store={store} />);

describe('App container', () => {
  it('should expose the correct props', () => {
    const { profile } = userProfile;

    expect(wrapper)
      .toHaveProp({
        dictionary,
        application,
        profile,
      }).toHaveProp('deleteCustomer');
  });


  it('should dispatch openModal', () => {
    store.dispatch(wrapper.props().openModal());
    expect(store.dispatch).toHaveBeenCalledWith({ type: 'MODAL_OPEN' });
  });

  it('should dispatch closeModal', () => {
    store.dispatch(wrapper.props().closeModal());
    expect(store.dispatch).toHaveBeenCalledWith({ type: 'MODAL_CLOSE' });
  });

  it('should dispatch deleteCustomer', () => {
    wrapper.props()
      .deleteCustomer('profile');
    expect(deleteUserProfile)
      .toHaveBeenCalledWith('profile');
  });
});
