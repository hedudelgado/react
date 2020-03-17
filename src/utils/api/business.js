import fetch from './utils/fetchWrapper';
import { getJsonItem } from '../session-storage';

export const tetherLogin = guid => fetch(`${getJsonItem('environment').apiURL}/business/tether/login`,
  {
    method: 'POST',
    body: JSON.stringify({ guid }),
  });

export const resetMemorableWord = payload => fetch(`${getJsonItem('environment').apiURL}/auth/hotels/memorable-word/reset`,
  {
    method: 'POST',
    body: JSON.stringify(payload),
  });
