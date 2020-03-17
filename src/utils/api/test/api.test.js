import {
  getAddressList,
  getConfig,
  getCountries,
  getNewsletterRegions,
  getNewsletterPreferences,
  updateProfile,
  validateBin,
  updateNewsletter,
  deleteCustomer,
  tetherLogin,
  resetMemorableWord,
  getProfile,
} from '..';

import { getJsonItem } from '../../session-storage';

jest.mock('../../session-storage', () => ({
  __esModule: true,
  getJsonItem: jest.fn((key) => {
    switch (key) {
      case 'environment':
        return {
          apiURL: 'https://api.whitbread.co.uk',
        };
      default:
        return '';
    }
  }),
}));

describe('API Calls', () => {
  let profile;

  beforeEach(() => {
    profile = {
      sessionId: '0Tj9myPeQmU3DTLd',
      contactDetail: { email: 'fresh@mailinator.com' },
      business: false,
    };
    jest.clearAllMocks();
  });

  describe('Fetch Config', () => {
    it('should fetch config', async () => {
      const getJson = jest.fn();
      global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
        json: getJson,
        ok: true,
      }));
      await getConfig().then(() => {
        expect(fetch).toHaveBeenCalled();
        expect(getJson).toHaveBeenCalled();
      });
    });
  });

  describe('Countries API', () => {
    const countriesResponse = {
      countries: [
        {
          countryCode: 'A',
          countryCodeISO: 'AT',
          countryLegend: 'Austria',
          passportRequired: true,
          dialingCode: '+43',
          flagImg: '/content/dam/global/flags/Austria.png',
        },
        {
          countryCode: 'D',
          countryCodeISO: 'DE',
          countryLegend: 'Germany',
          passportRequired: true,
          dialingCode: '+49',
          flagImg: '/content/dam/global/flags/Germany.png',
        },
        {
          countryCode: 'GB',
          countryCodeISO: 'GB',
          countryLegend: 'United Kingdom (the)',
          passportRequired: false,
          dialingCode: '+44',
          flagImg: '/content/dam/global/flags/United-Kingdom.png',
        },
        {
          countryCode: 'GR',
          countryCodeISO: 'GR',
          countryLegend: 'Greece',
          passportRequired: true,
          dialingCode: '+30',
          flagImg: '/content/dam/global/flags/Greece.png',
        },
      ],
    };

    it('should call the MS endpoint', async () => {
      const getJson = jest.fn(() => Promise.resolve(countriesResponse));
      global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
        json: getJson,
        ok: true,
      }));

      await getCountries().then((countries) => {
        expect(fetch).toHaveBeenCalledWith(
          'https://api.whitbread.co.uk/countries',
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          },
        );
        expect(getJson).toHaveBeenCalled();
        expect(countries).toHaveLength(4);
        expect(countries[0].countryLegend).toEqual('Austria');
        expect(countries[1].countryLegend).toEqual('Germany');
        expect(countries[2].countryLegend).toEqual('Greece');
        expect(countries[3].countryLegend).toEqual('United Kingdom (the)');
      });
    });

    it('should show error status text', async () => {
      const getJson = jest.fn(() => Promise.resolve({ someErrorProp: 'someErrorValue' }));
      global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
        json: getJson,
        ok: false,
        status: 'err',
      }));
      await getCountries().catch((error) => {
        expect(error).toEqual({ someErrorProp: 'someErrorValue' });
      });
    });
  });

  describe('Newsletter Regions API', () => {
    const regionsResponse = {
      regions: [
        {
          id: '1',
          description: 'UK & Ireland',
          active: true,
        },
        {
          id: '2',
          description: 'Dubai',
          active: true,
        },
        {
          id: '3',
          description: 'India',
          active: true,
        },
        {
          id: '4',
          description: 'hub by Premier Inn',
          active: true,
        },
        {
          id: '5',
          description: 'Germany',
          active: true,
        },
      ],
    };

    it('should call the MS endpoint', async () => {
      const getJson = jest.fn(() => Promise.resolve(regionsResponse));
      global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
        json: getJson,
        ok: true,
      }));

      await getNewsletterRegions().then((regions) => {
        expect(fetch).toHaveBeenCalledWith(
          'https://api.whitbread.co.uk/marketing/hotels/regions',
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          },
        );
        expect(getJson).toHaveBeenCalled();
        expect(regions).toHaveLength(5);
        expect(regions[0].description).toEqual('UK & Ireland');
        expect(regions[1].description).toEqual('Dubai');
        expect(regions[2].description).toEqual('India');
        expect(regions[3].description).toEqual('hub by Premier Inn');
        expect(regions[4].description).toEqual('Germany');
      });
    });

    it('should show error status text', async () => {
      const getJson = jest.fn(() => Promise.resolve({ someErrorProp: 'someErrorValue' }));
      global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
        json: getJson,
        ok: false,
        status: 'err',
      }));
      await getNewsletterRegions().catch((error) => {
        expect(error).toEqual({ someErrorProp: 'someErrorValue' });
      });
    });
  });

  describe('DELETE Customer API', () => {
    it('should delete the customer profile', async () => {
      const getJson = jest.fn(() => Promise.resolve({
        customerId: '1',
      }));

      global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
        ok: true,
        json: getJson,
      }));

      await deleteCustomer(profile).then(() => {
        expect(fetch).toHaveBeenCalledWith('https://api.whitbread.co.uk/customers/hotels/fresh@mailinator.com', {
          method: 'DELETE',
          headers: {
            'session-id': '0Tj9myPeQmU3DTLd',
            'Content-Type': 'application/json',
          },
        });
      });
    });
  });

  describe('GET Newsletter Preferences API', () => {
    const newsletterPreferenceResponse = {
      subscribedStatus: true,
      sessionId: 'bO4u7MvIMhPxluVJ',
      firstName: 'Rachelle',
      lastName: 'Ragasa',
      emailAddress: 'fresh@mailinator.com',
      countryCode: 'GB',
      businessClient: false,
      restaurantNewsletter: false,
      regions: [],
      regionSubscriptions: [
        {
          regionId: 1,
          subscribed: false,
        },
        {
          regionId: 2,
          subscribed: false,
        },
        {
          regionId: 3,
          subscribed: false,
        },
        {
          regionId: 4,
          subscribed: false,
        },
        {
          regionId: 5,
          subscribed: false,
        },
      ],
    };

    it('should call the newsletter preferences endpoint', async () => {
      const getJson = jest.fn(() => Promise.resolve(newsletterPreferenceResponse));
      global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
        json: getJson,
        ok: true,
      }));
      await getNewsletterPreferences(profile.email).then(() => {
        expect(fetch).toHaveBeenCalledWith(
          `https://api.whitbread.co.uk/marketing/hotels/newsletter/${profile.email}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
      });
    });

    it('should show error status text', async () => {
      const getJson = jest.fn(() => Promise.resolve({ someErrorProp: 'someErrorValue' }));
      global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
        json: getJson,
        ok: false,
        status: 'err',
      }));
      await getNewsletterPreferences().catch((error) => {
        expect(error).toEqual({ someErrorProp: 'someErrorValue' });
      });
    });
  });

  describe('GET Addresses API', () => {
    const addressResponse = {
      addresses: [
        {
          postcode: 'EC1N 2TD',
          label: 'Brainbow Ltd, 120 Holborn, LONDON, EC1N 2TD',
          line1: '120 Holborn',
          line4: 'LONDON',
          country: 'GB',
          companyName: 'Brainbow Ltd',
        },
        {
          postcode: 'EC1N 2TD',
          label: 'North Highland, 120 Holborn, LONDON, EC1N 2TD',
          line1: '120 Holborn',
          line4: 'LONDON',
          country: 'GB',
          companyName: 'North Highland',
        },
        {
          postcode: 'EC1N 2TD',
          label: 'North Highland UK (Holdings) Ltd, 120 Holborn, LONDON, EC1N 2TD',
          line1: '120 Holborn',
          line4: 'LONDON',
          country: 'GB',
          companyName: 'North Highland UK (Holdings) Ltd',
        },
      ],
    };

    it('should call the GET Addresses endpoint', async () => {
      const getJson = jest.fn(() => Promise.resolve(addressResponse));
      global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
        json: getJson,
        ok: true,
      }));
      await getAddressList('EC1N 2TD').then((addresses) => {
        expect(fetch).toHaveBeenCalledWith(
          'https://api.whitbread.co.uk/addresses/EC1N 2TD',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        expect(getJson).toHaveBeenCalled();
        expect(addresses).toHaveLength(3);
      });
    });
  });

  describe('updateProfile API', () => {
    const getJson = jest.fn(() => Promise.resolve());

    it('should call the endpoint with correct params', async () => {
      profile.business = true;
      global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
        json: getJson,
        ok: true,
      }));
      await updateProfile(profile).then(() => {
        expect(fetch).toHaveBeenCalledWith('https://api.whitbread.co.uk/customers/hotels/fresh@mailinator.com?business=true', {
          method: 'PUT',
          headers: { 'session-id': profile.sessionId, 'Content-Type': 'application/json' },
          body: JSON.stringify(profile),
        });
      });
    });

    it('should show error status text', () => {
      global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
        status: 'err',
        ok: false,
        json: jest.fn(() => Promise.resolve({ someErrorProp: 'someErrorValue' })),
      }));

      return updateProfile(profile).catch((error) => {
        expect(error).toEqual({ someErrorProp: 'someErrorValue' });
      });
    });
  });


  describe('getProfile', () => {
    const getJson = jest.fn(() => Promise.resolve());

    it('should call the endpoint with correct params', async () => {
      global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
        json: getJson,
        ok: true,
      }));
      await getProfile('some_email', 'some_session_id', false).then(() => {
        expect(fetch).toHaveBeenCalledWith('https://api.whitbread.co.uk/customers/hotels/some_email', {
          method: 'GET',
          headers: { 'session-id': 'some_session_id', 'Content-Type': 'application/json' },
        });
      });
    });

    it('should show error status text', () => {
      global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
        json: jest.fn(() => Promise.resolve({ someErrorProp: 'someErrorValue' })),
        status: 'err',
        ok: false,
      }));

      return getProfile(profile).catch((error) => {
        expect(error).toEqual({ someErrorProp: 'someErrorValue' });
      });
    });
  });

  describe('POST Marketing Newsletter API', () => {
    const newsletterPayload = {
      emailAddress: 'fresh@mailinator.com',
      regionSubscriptions: [
        {
          regionId: 1,
          subscribed: false,
        },
        {
          regionId: '2',
          subscribed: false,
        },
        {
          regionId: '3',
          subscribed: false,
        },
        {
          regionId: '4',
          subscribed: false,
        },
        {
          regionId: '5',
          subscribed: false,
        },
      ],
      sessionId: 'omAtn70bzfvklebq',
      firstName: 'Giacomo',
      lastName: 'Ragasa',
      countryCode: 'GB',
    };

    it('should update the newsletter preferences', async () => {
      const getJson = jest.fn(() => Promise.resolve({
        customerId: '1',
      }));
      global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
        ok: true,
        json: getJson,
      }));

      await updateNewsletter(newsletterPayload).then(() => {
        expect(fetch).toHaveBeenCalledWith('https://api.whitbread.co.uk/marketing/hotels/newsletter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newsletterPayload),
        });
      });
    });
  });

  describe('Validate bin', () => {
    it('should validate bin and pass the first 6 characters of the card number', async () => {
      const getJson = jest.fn();
      global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
        json: getJson,
        ok: true,
      }));
      await validateBin('4444333322221111').then(() => {
        expect(fetch).toHaveBeenCalledWith(
          `${getJsonItem('environment').apiURL}/payment/validations/444433`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          },
        );
        expect(getJson).toHaveBeenCalled();
      });
    });
  });

  describe('Tether login', () => {
    it('should login to world line', async () => {
      const getJson = jest.fn(() => Promise.resolve({}));
      global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
        ok: true,
        json: getJson,
      }));

      const guid = 'hdwahk14-dawdawgv3-2gavcawc';

      await tetherLogin(guid).then(() => {
        expect(fetch).toHaveBeenCalledWith('https://api.whitbread.co.uk/business/tether/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ guid }),
        });
      });
    });
  });

  describe('Reset memorable word', () => {
    it('should reset memorable word', async () => {
      const getJson = jest.fn(() => Promise.resolve({}));
      global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
        ok: true,
        json: getJson,
      }));

      const payload = {};

      await resetMemorableWord(payload).then(() => {
        expect(fetch).toHaveBeenCalledWith('https://api.whitbread.co.uk/auth/hotels/memorable-word/reset', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      });
    });
  });
});
