const enDictionary = require('./en.json');
const deDictionary = require('./de.json');

module.exports = [
  {
    language: 'en',
    configuration: enDictionary,
  },
  {
    language: 'de',
    configuration: deDictionary,
  },
];
