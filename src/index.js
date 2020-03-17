import 'core-js/es6/map';
import 'core-js/es6/set';
import 'core-js/es6/promise';
import 'core-js/es6/array';
import 'core-js/es6/string';
import 'core-js/es6/weak-map';
import 'core-js/es6/object';
import 'core-js/es7/array';
import 'whatwg-fetch';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import createStoreFromConfig, { getStore } from './utils/store';
import { getConfig } from './utils/api';
import { AppContainer as App } from './components/App';

import './main.scss';

const rootElement = document.getElementById('pi-account-settings');

const configUrl = rootElement.getAttribute('data-config');
const dictionaryUrl = rootElement.getAttribute('data-dictionary');

Promise.all([
  getConfig(configUrl),
  getConfig(dictionaryUrl),
]).then(([config, dictionary]) => {
  createStoreFromConfig({
    ...config,
    dictionary,
  });

  render(
    <Provider store={getStore()}>
      <App />
    </Provider>,
    rootElement,
  );
});
