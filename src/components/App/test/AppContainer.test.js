import { shallow } from 'enzyme/build';
import React from 'react';
import configureStore from 'redux-mock-store';
import AppContainer from '../AppContainer';
import { MODAL_CLOSE } from '../modalActions';

const mockedStore = configureStore();
const dictionary = {};
const config = {};
const countries = [{
  countryCode: 'GB',
  countryCodeISO: 'GB',
  countryLegend: 'United Kingdom (the)',
  passportRequired: false,
  dialingCode: '+44',
  flagImg: '/content/dam/global/flags/United-Kingdom.png',
}];
const application = {};
const newsletter = {};
const regions = [];
const defaultProps = {
  userProfile: {
    userDataReceived: false,
    profile: { someProp: 'someVal' },
  },
  userLoggedIn: jest.fn(),
  getSettings: jest.fn(),
  modal: {
    display: false,
    content: null,
  },
  application,
  dictionary,
  newsletter,
  countries,
  regions,
  config,
};

const store = mockedStore({ language: 'en', ...defaultProps });
store.dispatch = jest.fn();
const wrapper = shallow(<AppContainer store={store} />);

describe('App container', () => {
  it('should expose the correct language prop default value', () => {
    expect(wrapper)
      .toHaveProp({
        config,
        dictionary,
        countries,
      })
      .toHaveProp('getSettings')
      .toHaveProp('displayModal')
      .toHaveProp('modalContent')
      .toHaveProp('handleModalClose')
      .toHaveProp('profile', { someProp: 'someVal' })
      .toHaveProp('userDataReceived', false);
  });

  it('should dispatch getSettings', () => {
    wrapper.props().getSettings();
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('should dispatch closeModal', () => {
    wrapper.props().handleModalClose();
    expect(store.dispatch).toHaveBeenCalledWith({ type: MODAL_CLOSE });
  });
});
