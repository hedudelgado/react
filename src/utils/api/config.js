import fetch from './utils/fetchWrapper';

export const getConfig = configUrl => fetch(configUrl);
