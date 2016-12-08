"use strict";

var validCodes = {
		'G': 1,
		'M': 1
	},

	svgStart = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n' +
		'<svg ' +
			'xmlns="http://www.w3.org/2000/svg" ' +
			'version="1.1" ' +
			'width="210mm" ' +
			'height="297mm" ' +
			'viewBox="0 0 744.09448819 1052.3622047"' +
		'>\n',
	svgEnd = '\n</svg>',

	gcodePtrn = /([gmxyzfjiksp])\s*([\-\d\.]+)/gi,
	x0A = /\r/g,
	x0D = /\n/g,

	G_SvgCreators = require('./g-creators.js'),
	M_SvgCreators = require('./m-creators.js');

function filterValidCodes(a) {
	return validCodes[
		(a||'').trim()
			.charAt(0)
			.toUpperCase()
		];
}

function filterEmptyItems(a) {
	return !!a;
}

function fillProps(obj, str, code, value) {
	obj[code.toUpperCase()] = value.length ? parseFloat(value) : true;
	return '';
}

function convertCode(ctx, code) {
	var item = {},
		svgCreator,
		result;

	code.replace(gcodePtrn, fillProps.bind(null, item));
	
	svgCreator = 'G' in item ? G_SvgCreators['' + item.G] : ('M' in item ? M_SvgCreators['' + item.M] : null);
	
	return '\n<!-- ' + code + '-->\n' +
		((svgCreator ? svgCreator(ctx, item) : '') || '');
}

function convert(gCodeStr) {
	var context = {
		x: 0,
		y: 0,
		relative: false
	};
	return svgStart +
		( gCodeStr || '' ).toString()
		.replace( x0A, '')
		.split( x0D )
		.filter( filterValidCodes )
		.map( convertCode.bind(null, context) )
		.filter(filterEmptyItems)
		.join('\n') +
		svgEnd;
}

module.exports = convert;