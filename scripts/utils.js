const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const glob = require('glob');

const createFolder = (dest, name) => {
  rimraf.sync(path.join(dest, name));
  fs.mkdirSync(path.join(dest, name));
};

const createIntlMockedFolder = name => folder => ({ language, configuration }) => {
  fs.writeFileSync(path.join(folder, `${name}/${language}.json`), JSON.stringify(configuration));
};

exports.createConfigFolder = dest => createFolder(dest, 'config');
exports.createDictionaryFolder = dest => createFolder(dest, 'dictionary');

exports.createIntlMockedConfig = createIntlMockedFolder('config');
exports.createIntlMockedDictionary = createIntlMockedFolder('dictionary');

exports.createIntlPage = ({ language }) => {
  const originPath = path.join('./build', 'index.html');
  const destinationPath = path.join('./build', `${language}.html`);
  fs.readFile(originPath, 'utf8', (err, data) => {
    const newData = data
      .replace('data-config="/config/en.json"', `data-config="/config/${language}.json"`)
      .replace('data-dictionary="/dictionary/en.json"', `data-dictionary="/dictionary/${language}.json"`);
    fs.writeFileSync(destinationPath, newData);
  });
};

exports.updateUIKitPaths = () => {
  glob(`${__dirname}/../build/static/css/*.css`, {}, (err, files) => {
    files.forEach(file => {
      fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
          return console.error(err);
        }
        const result = data
          .replace(/ui-kit\/assets\/wb-fonts/g, 'etc/designs/pi/desktop/assets/wb-fonts')
          .replace(/ui-kit\/assets\/wb-icons/g, 'etc/designs/pi/desktop/assets/wb-icons');

        fs.writeFile(file, result, 'utf8', err => {
          if (err) return console.error(err);
        });
      });
    });
  });
};
