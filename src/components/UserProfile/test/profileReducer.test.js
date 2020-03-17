import reducer from '../profileReducer';
import { PROFILE_UPDATED, PROFILE_RECEIVED, RESET_USER_INFO } from '../../App/appActions';

describe('Profile Reducer', () => {
  const defaultState = {
    userDataReceived: false,
    profile: { business: false },
  };
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(defaultState);
  });

  it('should add profile', () => {
    const action = {
      type: PROFILE_RECEIVED,
      profile: {
        business: true,
      },
    };
    expect(reducer(undefined, action))
      .toEqual({ profile: { business: true }, userDataReceived: true });
  });

  it('should update profile', () => {
    const action = {
      type: PROFILE_UPDATED,
      profile: { business: false },
    };
    expect(reducer(undefined, action))
      .toEqual({ profile: { business: false }, userDataReceived: false });
  });

  it('should reset profile', () => {
    const action = {
      type: RESET_USER_INFO,
    };
    expect(reducer(undefined, action))
      .toEqual(defaultState);
  });
});
