const application = require('./application.json');
const environment = require('./environment.json');

module.exports = [
  {
    language: 'en',
    configuration: {
      application,
      environment,
    },
  },
  {
    language: 'de',
    configuration: {
      application,
      environment,
    },
  },
];
