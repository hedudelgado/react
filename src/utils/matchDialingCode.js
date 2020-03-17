import { matchCountry } from './matchCountry';

const DEFAULT_COUNTRY = {
  countryCode: 'GB',
  dialingCode: '+44',
};

export const matchDialingCode = (mobileNumber, countries, addressCountryCode) => {
  if (mobileNumber[0] === '+') {
    const addressCountry = countries.find(matchCountry(addressCountryCode));
    if (mobileNumber.startsWith(addressCountry.dialingCode)) {
      return addressCountry;
    }
    let matchedCountry = { dialingCode: '' };
    countries.forEach((country) => {
      if (mobileNumber.startsWith(country.dialingCode)
        && country.dialingCode.length > matchedCountry.dialingCode.length) {
        matchedCountry = country;
      }
    });
    return matchedCountry.dialingCode.length > 0
      ? matchedCountry
      : DEFAULT_COUNTRY;
  }
  return DEFAULT_COUNTRY;
};
