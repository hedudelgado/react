import reducer from './countriesReducer';
import { COUNTRIES_RECEIVED } from '../../components/App/appActions';

const countries = [{
  countryCode: 'GB',
  countryCodeISO: 'GB',
  countryLegend: 'United Kingdom (the)',
  passportRequired: false,
  dialingCode: '+44',
  flagImg: '/content/dam/global/flags/United-Kingdom.png',
}];

const defaultState = [];

describe('Countries Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(defaultState);
  });

  it('should set the state with passed object', () => {
    expect(reducer(undefined, { type: COUNTRIES_RECEIVED, countries })).toEqual(countries);
  });
});
