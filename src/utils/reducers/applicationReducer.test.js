import reducer from './applicationReducer';

const defaultState = { showEmailPreferences: false };

describe('Application Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(defaultState);
  });
});
