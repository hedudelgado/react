import React from 'react';
import reducer from '../modalReducer';

import {
  MODAL_OPEN,
  MODAL_CLOSE,
} from '../modalActions';

jest.mock('../../../utils/api', () => ({
  __esModule: true,
}));

const defaultState = {
  display: false,
  content: null,
};

describe('Modal Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(defaultState);
  });

  describe('Modal open', () => {
    it('should set display to true and set correct content', () => {
      const content = <div />;
      const action = {
        type: MODAL_OPEN,
        content,
      };

      expect(reducer(undefined, action)).toEqual({
        ...defaultState,
        display: true,
        content,
      });
    });
  });

  describe('Modal close', () => {
    it('should set display to false and clear content', () => {
      const action = {
        type: MODAL_CLOSE,
      };

      expect(reducer(undefined, action)).toEqual({
        ...defaultState,
        display: false,
        content: null,
      });
    });
  });
});
