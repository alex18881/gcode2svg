var format = require('util').format,
	strokeColor = 'black',
	strokeWidth = 2;

function translateTo (context, node) {
	if ('X' in node && 'Y' in node) {
		node.X = node.X || 0;
		node.Y = node.Y || 0;

		if (context.relative) {
			context.x += node.X;
			context.y += node.Y;
		} else {
			context.x = node.X;
			context.y = node.Y;
		}
		return format('<!-- translate to [%d, %d] -->', context.x, context.y);
	}
}
function lineTo (context, node) {
	if ('X' in node && 'Y' in node) {
		node.X = node.X || 0;
		node.Y = node.Y || 0;

		var x1 = context.x,
			y1 = context.y,
			x2 = context.relative ? x1 + node.X : node.X,
			y2 = context.relative ? y1 + node.Y : node.Y;

		context.x = x2;
		context.y = y2;

		return format(
			'<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="%s" stroke-width="%d"/>',
			x1, y1,
			x2, y2,
			context.color || strokeColor,
			context.lineWidth || strokeWidth
		);
	}
}

function curveToCW (context, node) {
	return getCurve(context, node, true);
}

function curveToCCW (context, node) {
	return getCurve(context, node, false);
}

function getCurve(context, node, clockwise) {
	if ('X' in node && 'Y' in node && 'I' in node && 'J' in node ) {
		node.X = node.X || 0;
		node.Y = node.Y || 0;
		node.I = node.I || 0;
		node.J = node.J || 0;

		var x1 = context.x,
			y1 = context.y,
			x2 = context.relative ? x1 + node.X : node.X,
			y2 = context.relative ? y1 + node.Y : node.Y,
			rx = Math.sqrt(Math.pow(node.I, 2) + Math.pow(node.J, 2)),
			ry = rx;

		context.x = x2;
		context.y = y2;	

		return format(
			'<path d="M%d,%d A%d,%d 1 0,%d %d,%d" stroke="%s" stroke-width="%d" fill="none"/>',
			x1, y1,
			rx, ry,
			clockwise? 0 : 1,
			x2, y2,
			context.color || strokeColor,
			context.lineWidth || strokeWidth
		);
	}
}

function setUnitsMM (context, node) {

}

function setAbsoluteCoords (context, node) {
	context.relative = false;
}

function setRelativeCoords (context, node) {
	context.relative = true;
}

module.exports = {
	0: translateTo,
	1: lineTo,
	2: curveToCW,
	3: curveToCCW,
	21: setUnitsMM,
	90: setAbsoluteCoords,
	91: setRelativeCoords
};