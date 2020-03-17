const {
  createConfigFolder,
  createDictionaryFolder,
  createIntlMockedConfig,
  createIntlMockedDictionary,
  createIntlPage,
} = require('./utils');

const config = require('../mockedConfig');
const dictionary = require('../mockedDictionary');

const createBuildMockedConfig = createIntlMockedConfig('./build');
const createDevMockedDictionary = createIntlMockedDictionary('./build');

createConfigFolder('./build');
createDictionaryFolder('./build');

config.forEach(createBuildMockedConfig);
dictionary.forEach(createDevMockedDictionary);

config.forEach(createIntlPage);
