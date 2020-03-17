import fetch from './utils/fetchWrapper';
import { getJsonItem } from '../session-storage';

const extractCountries = ({ countries }) => countries;

const sortByCountryLegend = (a, b) => ((a.countryLegend > b.countryLegend) ? 1 : -1);
const sortCountries = countries => countries.sort(sortByCountryLegend);

export const getCountries = () => fetch(`${getJsonItem('environment').apiURL}/countries`)
  .then(extractCountries)
  .then(sortCountries);
