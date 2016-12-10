"use strict";

var validCodes = {
		'G': 1,
		'M': 1
	},

	sheetSizes = {
		mm: { width: 210, height: 297 },
		in: { width: 11.93, height: 15.98 }
	},

	svgStart = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n' +
		'<svg xmlns="http://www.w3.org/2000/svg" ' +
			'version="1.1" ' +
			'width="%d%s" ' +
			'height="%d%s" ' +
			'viewBox="0 0 %d %d"' +
		'>\n',
	svgEnd = '\n</svg>',

	gcodePtrn = /([gmxyzfjiksp])\s*([\-\d\.]+)/gi,
	x0A = /\r/g,
	x0D = /\n/g,

	format = require('util').format,
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
	}, result, sizes;
	
	// Default units are mm
	G_SvgCreators[21](context);

	result = ( gCodeStr || '' ).toString()
		.replace( x0A, '')
		.split( x0D )
		.filter( filterValidCodes )
		.map( convertCode.bind(null, context) )
		.filter(filterEmptyItems)
		.join('\n');

	sizes = sheetSizes[context.unit];


	return format(
			svgStart,
			sizes.width, context.unit,
			sizes.height, context.unit,
			sizes.width, sizes.height
		) + result + svgEnd;
}

module.exports = convert;