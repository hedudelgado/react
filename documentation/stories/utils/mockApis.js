import fetchMock from 'fetch-mock';

import mockedProfile from '../../../__mocks__/profile.json';
import mockedRegions from '../../../__mocks__/regions.json';
import mockedCountries from '../../../__mocks__/countries.json';
import newsletterPreferences from '../../../__mocks__/newsletterPreferences.json';

export default (story) => {
  fetchMock.reset();

  fetchMock
    .get(/^https:\/\/(.+)\/customers\/hotels\/(.+)$/g, mockedProfile)
    .get(/^https:\/\/(.+)\/marketing\/hotels\/regions$/g, mockedRegions)
    .get(/^https:\/\/(.+)\/countries$/g, mockedCountries)
    .get(/^https:\/\/(.+)\/marketing\/hotels\/newsletter\/(.+)$/g, newsletterPreferences)
    .catch();

  return story();
};
