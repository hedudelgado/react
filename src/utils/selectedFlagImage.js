import { matchCountry } from './matchCountry';

export const selectedFlagImage = (code, countries) => countries.find(matchCountry(code)).flagImg;
