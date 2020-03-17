import { shallow } from 'enzyme';
import React from 'react';
import configureStore from 'redux-mock-store';
import MoveAccountContainer from '../MoveAccountContainer';

const mockedStore = configureStore();
const dictionary = {};
const storeProps = {
  dictionary,
};
const props = {
  dictionary,
};

const store = mockedStore({ ...storeProps });
store.dispatch = jest.fn();
const wrapper = shallow(<MoveAccountContainer store={store} {...props} />);

describe('MoveAccount container', () => {
  it('should expose the correct props', () => {
    expect(wrapper).toHaveProp({ dictionary });
  });
});
