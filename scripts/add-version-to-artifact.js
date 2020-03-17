const version = require('../package').version;
const fs = require('fs');
const timeStamp = new Date().toLocaleString();

const stamp = `/*!
* Premier Inn Account Settings v${version}
* Built at ${timeStamp}
* Whitbread Digital
*/
`;

const dir = process.argv[2];

let buildFileName = fs.readdirSync(`${__dirname}/../${dir}`).filter(fn => !fn.endsWith('.map'));
let buildOutput = fs.readFileSync(`${__dirname}/../${dir}/${buildFileName}`);

buildOutput = stamp + buildOutput;

fs.writeFileSync(`${__dirname}/../${dir}/${buildFileName}`, buildOutput);