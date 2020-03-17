import { HeaderInterface, InvalidSessionHelper, InvalidSessionErrorCodeMap } from 'mega-code';
import {
  getSettings,
  updateUserProfile,
  deleteUserProfile,
  COUNTRIES_RECEIVED,
  REGIONS_RECEIVED,
  NEWSLETTER_RECEIVED,
  NEWSLETTER_ERROR, PROFILE_RECEIVED, PROFILE_ERROR, RESET_USER_INFO, RESET_NEWSLETTER_INFO,
} from '../appActions';

import {
  getCountries,
  getNewsletterRegions,
  getNewsletterPreferences,
  getProfile,
  updateProfile,
  deleteCustomer,
} from '../../../utils/api';

jest.mock('../../../utils/api', () => ({
  __esModule: true,
  getCountries: jest.fn(() => Promise.resolve([])),
  getNewsletterRegions: jest.fn(() => Promise.resolve({})),
  getNewsletterPreferences: jest.fn(() => Promise.resolve({})),
  getProfile: jest.fn(() => Promise.resolve({})),
  updateProfile: jest.fn(() => Promise.resolve('some profile result')),
  deleteCustomer: jest.fn(() => Promise.resolve('some delete profile result')),
}));

const dispatch = jest.fn();

describe('Initialise the application\'s settings', () => {
  InvalidSessionHelper.isSessionExpired = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call all dispatch events', async () => {
    getSettings()(dispatch, () => ({ application: { showEmailPreferences: true } }));
    await Promise.all([
      getCountries,
      getNewsletterRegions,
      getNewsletterPreferences,
      getProfile,
    ]).then(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: COUNTRIES_RECEIVED, countries: [] });
      expect(dispatch).toHaveBeenCalledWith({ type: REGIONS_RECEIVED, regions: {} });
      expect(dispatch).toHaveBeenCalledWith({ type: NEWSLETTER_RECEIVED, newsletter: {} });
      expect(dispatch).toHaveBeenCalledWith({ type: PROFILE_RECEIVED, profile: {} });
    });
  });

  it('should not call all dispatch events when showEmailPreferences is disabled', async () => {
    getSettings()(dispatch, () => ({ application: { showEmailPreferences: false } }));
    await Promise.all([
      getCountries,
      getNewsletterRegions,
      getNewsletterPreferences,
      getProfile,
    ]).then(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: COUNTRIES_RECEIVED, countries: [] });
      expect(dispatch).not.toHaveBeenCalledWith({ type: REGIONS_RECEIVED, regions: {} });
      expect(dispatch).not.toHaveBeenCalledWith({ type: NEWSLETTER_RECEIVED, newsletter: {} });
      expect(dispatch).toHaveBeenCalledWith({ type: PROFILE_RECEIVED, profile: {} });
    });
  });

  it('should handle failure', async () => {
    getNewsletterPreferences.mockImplementationOnce(() => Promise.reject('test'));
    getProfile.mockImplementationOnce(() => Promise.reject('test1'));
    getSettings()(dispatch, () => ({ application: { showEmailPreferences: true } }));

    await Promise.all([
      getCountries,
      getNewsletterRegions,
      getNewsletterPreferences,
    ]).then(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: COUNTRIES_RECEIVED, countries: [] });
      expect(dispatch).toHaveBeenCalledWith({ type: REGIONS_RECEIVED, regions: {} });
      expect(dispatch).toHaveBeenCalledWith({ type: NEWSLETTER_ERROR, error: 'test' });
      expect(dispatch).toHaveBeenCalledWith({ type: PROFILE_ERROR, error: 'test1' });
    });
  });

  it('should handle invalid session failure', async () => {
    HeaderInterface.userLogOut = jest.fn();
    InvalidSessionHelper.isSessionExpired.mockImplementationOnce(() => true);
    getProfile.mockImplementationOnce(() => Promise.reject('test1'));
    getSettings()(dispatch, () => ({ application: { showEmailPreferences: true } }));

    await Promise.all([
      getCountries,
      getNewsletterRegions,
      getNewsletterPreferences,
    ]);
    expect(dispatch).toHaveBeenCalledWith({ type: PROFILE_ERROR, error: 'test1' });
    expect(dispatch).toHaveBeenCalledWith({ type: RESET_USER_INFO });
    expect(dispatch).toHaveBeenCalledWith({ type: RESET_NEWSLETTER_INFO });
    expect(HeaderInterface.userLogOut)
      .toHaveBeenCalledWith(HeaderInterface.LOG_OUT_REASONS.SESSION_EXPIRED);
    expect(InvalidSessionHelper.isSessionExpired).toHaveBeenCalledWith('test1', InvalidSessionErrorCodeMap.ACCOUNT.invalidSession);
  });
});

describe('updateUserProfile', () => {
  it('should return the updateProfile result', async () => {
    const result = await updateUserProfile('some user data')(dispatch);

    expect(result).toEqual('some profile result');
  });

  it('should return the updateProfile error', () => {
    updateProfile.mockImplementationOnce(() => Promise.reject('some profile error'));
    updateUserProfile('some user data')(dispatch).catch((error) => {
      expect(error).toEqual('some profile error');
      expect(InvalidSessionHelper.isSessionExpired).toHaveBeenCalledWith('some profile error', InvalidSessionErrorCodeMap.ACCOUNT.invalidSession);
    });
  });

  it('should dispatch the right types on invalid session', () => {
    updateProfile.mockImplementationOnce(() => Promise.reject('some profile error'));
    InvalidSessionHelper.isSessionExpired.mockImplementationOnce(() => true);
    updateUserProfile('some user data')(dispatch).catch((error) => {
      expect(dispatch).toHaveBeenCalledWith({ type: RESET_USER_INFO });
      expect(dispatch).toHaveBeenCalledWith({ type: RESET_NEWSLETTER_INFO });
      expect(error).toEqual('some profile error');
    });
  });
});

describe('deleteUserProfile', () => {
  it('should return the deleteCustomer result', async () => {
    const result = await deleteUserProfile('some user data')(dispatch);

    expect(result).toEqual('some delete profile result');
  });

  it('should return the deleteCustomer error', async () => {
    deleteCustomer.mockImplementationOnce(() => Promise.reject('some delete profile error'));
    try {
      await deleteUserProfile('some user data')(dispatch);
    } catch (error) {
      expect(error).toEqual('some delete profile error');
      expect(InvalidSessionHelper.isSessionExpired).toHaveBeenCalledWith('some delete profile error', InvalidSessionErrorCodeMap.DELETE_PROFILE.invalidSession);
    }
  });

  it('should dispatch the right types on invalid session', async () => {
    deleteCustomer.mockImplementationOnce(() => Promise.reject('some profile deletion error'));
    InvalidSessionHelper.isSessionExpired.mockImplementationOnce(() => true);
    try {
      await deleteUserProfile('some user data')(dispatch);
    } catch (error) {
      expect(dispatch).toHaveBeenCalledWith({ type: RESET_USER_INFO });
      expect(dispatch).toHaveBeenCalledWith({ type: RESET_NEWSLETTER_INFO });
      expect(error).toEqual('some profile deletion error');
    }
  });
});
