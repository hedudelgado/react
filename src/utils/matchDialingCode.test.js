import { matchDialingCode } from './matchDialingCode';

describe('matchDialingCode function', () => {
  let countries;

  const DEFAULT_COUNTRY = {
    countryCode: 'GB',
    dialingCode: '+44',
  };

  beforeEach(() => {
    countries = [
      {
        countryCode: 'GB',
        countryCodeISO: 'GB',
        countryLegend: 'United Kingdom (the)',
        passportRequired: false,
        dialingCode: '+44',
        flagImg: '/content/dam/global/flags/United-Kingdom.png',
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
        countryCode: 'GR',
        countryCodeISO: 'GR',
        countryLegend: 'Greece',
        passportRequired: true,
        dialingCode: '+30',
        flagImg: '/content/dam/global/flags/Greece.png',
      },
      {
        countryCode: 'TEST',
        countryCodeISO: 'TEST',
        countryLegend: 'Test',
        passportRequired: true,
        dialingCode: '+499',
        flagImg: 'test.png',
      },
    ];
  });

  it('should execute the function with the correct parameters', () => {
    expect(matchDialingCode('+491234579', countries, 'D')).toEqual(countries[1]);
  });

  it('should get GB country code if there\'s no + indicator on mobile number', () => {
    expect(matchDialingCode('99999999', countries, 'MOON')).toEqual(DEFAULT_COUNTRY);
  });

  it('should match with address countryCode first', () => {
    expect(matchDialingCode('+4999999999', countries, 'D')).toBe(countries[1]);
  });

  it('should return strongest match if it doesn\'t match with address country code', () => {
    expect(matchDialingCode('+4999999999', countries, 'GB')).toBe(countries[3]);
  });

  it('should default to GB if there are no matches at all', () => {
    expect(matchDialingCode('+4123999999999', countries, 'GB')).toEqual(DEFAULT_COUNTRY);
  });
});
