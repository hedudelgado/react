import reducer from './dictionaryReducer';

const defaultState = {};

describe('Dictionary Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(defaultState);
  });
});
