import fetch from './utils/fetchWrapper';
import { getJsonItem } from '../session-storage';

const extractAddresses = ({ addresses }) => addresses;

export const getAddressList = postCode => fetch(`${getJsonItem('environment').apiURL}/addresses/${postCode}`)
  .then(extractAddresses);
