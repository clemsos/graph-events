'use strict';

var _Graph = require('./js/Graph.js');

var _Graph2 = _interopRequireDefault(_Graph);

var _GraphEvent = require('./js/GraphEvent.js');

var _GraphEvent2 = _interopRequireDefault(_GraphEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// export for browser
if (typeof window !== 'undefined') window.Graph = _Graph2.default;
if (typeof window !== 'undefined') window.GraphEvent = _GraphEvent2.default;

module.exports.GraphEvent = _GraphEvent2.default;
module.exports.Graph = _Graph2.default;