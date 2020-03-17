const utils = require('./utils');

const {
  createConfigFolder,
  createDictionaryFolder,
  createIntlMockedConfig,
  createIntlMockedDictionary,
} = utils;

const config = require('../mockedConfig');
const dictionary = require('../mockedDictionary');

createConfigFolder('./public');
createDictionaryFolder('./public');

const createDevMockedConfig = createIntlMockedConfig('./public');
const createDevMockedDictionary = createIntlMockedDictionary('./public');

config.forEach(createDevMockedConfig);
dictionary.forEach(createDevMockedDictionary);
