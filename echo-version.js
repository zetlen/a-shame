#!/usr/bin/env node
const figlet = require('figlet'),
  chalk = require('chalk'),
  moment = require('moment'),
  childProcess = require('child_process'),
  columnify = require('columnify')
	version = require('./'),
	fonts = figlet.fontsSync(),
	fontNumber = Math.floor(fonts.length * Math.random()),
	font = fonts[fontNumber];

console.log(chalk`{bgBlack.bold.hex('#FF8585') Welcome to version...}
{bgBlack.bold.hex('#FF6161') ${figlet.textSync(version, font)}}{bgBlack.dim.gray #${fontNumber}: ${font}}
{bgBlack.bold.hex('#64C0C0') installed locally at:}{bgBlack.bold.hex('#9ADEDE') ${__dirname}}
`);

try {
  const distTags = {};
  require('child_process').execSync('npm dist-tags ls create-a-shame', { encoding: 'utf8' })
  .split('\n')
  .forEach(s => {
    const [tag, ver] = s.split(':').map(w => w.trim());
    distTags[ver] = tag;
  })
  const time = JSON.parse(require('child_process').execSync('npm info create-a-shame time --json'));
  const publishedVersions = [];
  for (let [ver, ts] of Object.entries(time)) {
    if (ver !== 'created' && ver !== 'modified') {
      const row = {};
      const published = moment(ts).calendar();
      if (ver === version) {
        row.version = chalk.bold.whiteBright(ver);
        row.published = chalk.bold.whiteBright(published);
      } else {
        row.version = chalk.bgBlack.bold.hex('#9ADEDE')(ver);
        row.published = chalk.bgBlack.bold.hex('#64C0C0')(published);
      }
      if (distTags[ver]) {
        row.tag = chalk.bgBlack.bold.hex('#9ADEDE')(distTags[ver]);
      }
      publishedVersions.push(row);
    }
  }
  console.log(chalk.bgBlack.bold.hex('#3DA0A0')('On the NPM registry:\n'));
  console.log(columnify(publishedVersions, {
    columnSplitter: ' ',
    headingTransform: h => chalk.bgBlack.underline.hex('#3DA0A0')(h.toLowerCase()),
    config: {
      version: {
        align: 'right'
      },
      tag: {
        showHeaders: false
      }
    }
  }))
} catch (e) {
  // nothing
  console.log('Could not get versions', e);
}

console.log(chalk`
{bgBlack.bold.hex('#A6DC38') THIS IS VERSION} {bgBlack.bold.hex('#CDFF7F') ${version}}
`);
