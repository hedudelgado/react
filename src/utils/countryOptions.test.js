import { countryOptions } from './countryOptions';

describe('countryOptions function', () => {
  const countries = [
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

  it('should execute the function with the correct parameters', () => {
    expect(countryOptions(countries)).toHaveLength(4);
  });
});
