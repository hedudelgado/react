/* eslint-disable */
export const getCountries = jest.fn(() => Promise.resolve([
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
]));

export const getDictionary = jest.fn(() => Promise.resolve({
  'profile.button.changepassword': 'Change password',
  'profile.button.edit': 'Edit Profile',
  'profile.preview.password': 'Password ************',
  'profile.title': 'Your Profile',
}));
