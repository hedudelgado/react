import React from 'react';
import { Provider } from 'react-redux';

import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from '../../../src/utils/root-reducer';

import { createInitialStoreFromConfig } from '../../../src/utils/store';
import applicationMock from '../../../mockedConfig/application.json';
import environmentMock from '../../../mockedConfig/environment.json';
import dictionaryMock from '../../../mockedDictionary/en.json';

const middlewares = [thunk];

export default (initialStore = {}) => {
  const {
    application = applicationMock,
    environment = environmentMock,
    dictionary = dictionaryMock,
    ...initialState
  } = initialStore;

  return (story) => {
    const createStoreFromConfig = () => createStore(
      rootReducer,
      {
        ...createInitialStoreFromConfig({
          application,
          environment,
          dictionary,
        }),
        ...initialState,
      },
      composeWithDevTools(
        applyMiddleware(
          ...middlewares,
        ),
      ),
    );

    return (
      <Provider key={Math.random()} store={createStoreFromConfig()}>
        { story() }
      </Provider>
    );
  };
};
