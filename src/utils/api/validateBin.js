import fetch from './utils/fetchWrapper';
import { getJsonItem } from '../session-storage';

export default cardNumber => fetch(`${getJsonItem('environment').apiURL}/payment/validations/${cardNumber.replace(/\s/g, '').slice(0, 6)}`);
