const fs = require('fs');

const path = require('path');

const COMPONENTS_DIR = path.resolve(__dirname, '../../src/components');
const SCRIPTS_DIR = path.resolve(__dirname, './');

const fName = process.argv[2];

const componentTemplate = fs.readFileSync(
  `${SCRIPTS_DIR}/Component.txt`,
  'utf8',
);

const indexTemplate = fs.readFileSync(
  `${SCRIPTS_DIR}/index.txt`,
  'utf8',
);

const componentTestTemplate = fs.readFileSync(
  `${SCRIPTS_DIR}/test/Component.test.txt`,
  'utf8',
);

const indexTestTemplate = fs.readFileSync(
  `${SCRIPTS_DIR}/test/index.test.txt`,
  'utf8',
);

fs.mkdirSync(`${COMPONENTS_DIR}/${fName}`);
fs.mkdirSync(`${COMPONENTS_DIR}/${fName}/test`);

fs.writeFileSync(
  `${COMPONENTS_DIR}/${fName}/${fName}.js`,
  componentTemplate.replace(/\$CNAME/g, fName).replace(/\$FNAME/g, fName),
  'utf8',
);
fs.writeFileSync(
  `${COMPONENTS_DIR}/${fName}/index.js`,
  indexTemplate.replace(/\$CNAME/g, fName).replace(/\$FNAME/g, fName),
  'utf8',
);

fs.writeFileSync(
  `${COMPONENTS_DIR}/${fName}/test/${fName}.test.js`,
  componentTestTemplate.replace(/\$CNAME/g, fName).replace(/\$FNAME/g, fName),
  'utf8',
);
fs.writeFileSync(
  `${COMPONENTS_DIR}/${fName}/test/index.test.js`,
  indexTestTemplate.replace(/\$CNAME/g, fName).replace(/\$FNAME/g, fName),
  'utf8',
);
