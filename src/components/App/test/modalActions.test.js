import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  MODAL_OPEN,
  MODAL_CLOSE,
  openModal,
  closeModal,
} from '../modalActions';

const mockStore = configureMockStore([thunk]);

describe('Modal Actions', () => {
  const store = mockStore();

  afterEach(() => {
    store.clearActions();
  });

  it('should create MODAL_OPEN action', () => {
    const content = <div />;
    store.dispatch(openModal(content));
    expect(store.getActions()).toEqual([{
      type: MODAL_OPEN,
      content,
    }]);
  });

  it('should create MODAL_CLOSE action', () => {
    store.dispatch(closeModal());
    expect(store.getActions()).toEqual([{
      type: MODAL_CLOSE,
    }]);
  });
});
