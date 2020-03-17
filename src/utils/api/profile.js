import { getJsonItem } from '../session-storage';
import fetch from './utils/fetchWrapper';

const getUrl = (email, business) => `${getJsonItem('environment').apiURL}/customers/hotels/${email}${business ? '?business=true' : ''}`;

export const updateProfile = (profile) => {
  const { contactDetail: { email }, business, sessionId } = profile;
  return fetch(
    getUrl(email, business),
    {
      method: 'PUT',
      headers: {
        'session-id': sessionId,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profile),
    },
  );
};

export const deleteProfile = (profile) => {
  const { contactDetail: { email }, business, sessionId } = profile;
  return fetch(
    getUrl(email, business),
    {
      method: 'DELETE',
      headers: {
        'session-id': sessionId,
        'Content-Type': 'application/json',
      },
    },
  );
};

export const getProfile = (email, sessionId, business) => fetch(
  getUrl(email, business),
  {
    method: 'GET',
    headers: {
      'session-id': sessionId,
      'Content-Type': 'application/json',
    },
  },
);
