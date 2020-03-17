import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import { setItem } from './session-storage';
import rootReducer from './root-reducer';
import analytics, { initAnalytics } from './middlewares/analytics';

let store;

const middlewares = [thunk, analytics];

if (process.env.NODE_ENV === 'development') middlewares.push(logger);

export const createInitialStoreFromConfig = ({
  application,
  dictionary,
  environment,
}) => {
  setItem('environment', environment);
  initAnalytics(application);
  return {
    application,
    dictionary,
  };
};

const createStoreFromConfig = (config) => {
  store = createStore(
    rootReducer,
    createInitialStoreFromConfig(config),
    composeWithDevTools(
      applyMiddleware(
        ...middlewares,
      ),
    ),
  );
};

export const getStore = () => store;

export default createStoreFromConfig;
