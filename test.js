var gcode2svg = require('./index.js'),
	fs = require('fs'),
	gcodes = [
		fs.readFileSync('test-g-code/circle.ngc'),
		fs.readFileSync('test-g-code/circle1.ngc'),
		fs.readFileSync('test-g-code/helix-ccw.ngc'),
		fs.readFileSync('test-g-code/line-100mm.dgc'),
		fs.readFileSync('test-g-code/text.ngc')
	];

console.log('<!DOCTYPE html><html><body>\n' + gcodes.map(gcode2svg).join('\n<hr>\n') + '\n</body></html>');