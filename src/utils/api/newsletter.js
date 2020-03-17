import fetch from './utils/fetchWrapper';
import { getJsonItem } from '../session-storage';

const getNewsletterPath = () => `${getJsonItem('environment').apiURL}/marketing/hotels`;

const extractRegions = ({ regions }) => regions;

export const getNewsletterRegions = () => fetch(`${getNewsletterPath()}/regions`).then(extractRegions);

export const getNewsletterPreferences = email => fetch(`${getNewsletterPath()}/newsletter/${email}`);

export const updateNewsletter = payload => fetch(`${getNewsletterPath()}/newsletter`, {
  method: 'POST',
  body: JSON.stringify(payload),
});
