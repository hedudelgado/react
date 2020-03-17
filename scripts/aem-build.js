const aemPackageBuild = require('pi-aem-fe-package-build');
const appName = require('../package.json').name;
const appVersion = require('../package.json').version;

aemPackageBuild.build(appName, appVersion);
