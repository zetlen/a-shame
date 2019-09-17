const figlet = require('figlet'),
	version = require('./');
	fonts = figlet.fontsSync();
	fontNumber = Math.floor(fonts.length * Math.random());
	font = fonts[fontNumber];

console.log(`${figlet.textSync('v' + version, font)}
#${fontNumber}: ${font}
version: ${version}
location: ${__dirname}
`);
