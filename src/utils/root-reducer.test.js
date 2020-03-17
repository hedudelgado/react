import { createStore } from 'redux';

import rootReducer from './root-reducer';

jest.mock('../components/UserProfile/profileReducer', () => ({
  __esModule: true,
  default: () => 'userProfile',
}));

jest.mock('./reducers/dictionaryReducer', () => ({
  __esModule: true,
  default: () => 'dictionary',
}));

jest.mock('./reducers/applicationReducer', () => ({
  __esModule: true,
  default: () => 'application',
}));

jest.mock('./reducers/countriesReducer', () => ({
  __esModule: true,
  default: () => [],
}));

jest.mock('./reducers/newsletterRegionsReducer', () => ({
  __esModule: true,
  default: () => 'regions',
}));

jest.mock('./reducers/newsletterPreferencesReducer', () => ({
  __esModule: true,
  default: () => 'newsletter',
}));

jest.mock('../components/App/appReducer', () => ({
  __esModule: true,
  default: () => 'app',
}));

jest.mock('../components/App/modalReducer', () => ({
  __esModule: true,
  default: () => 'modal',
}));

describe('Combine Reducer', () => {
  it('Should return the store with the right objects', () => {
    const store = createStore(rootReducer);

    expect(store.getState()).toEqual({
      countries: [],
      userProfile: 'userProfile',
      dictionary: 'dictionary',
      application: 'application',
      regions: 'regions',
      newsletter: 'newsletter',
      app: 'app',
      modal: 'modal',
    });
  });
});
