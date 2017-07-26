'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _deepEqual = require('deep-equal');

var _deepEqual2 = _interopRequireDefault(_deepEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *
 * The Graph class receives GraphEvents objects and turn into a proper network
 *
 * @name Graph
 * @kind class
 * @param {Array} events An array of GraphEvent objects
 * @example var g = new GraphEvent([...GraphEvent, GraphEvent])
 */
var Graph = function () {
  function Graph(graphEvents) {
    var _this = this;

    _classCallCheck(this, Graph);

    if (!graphEvents instanceof Array) throw new Error('Graph Events should be an array.');

    graphEvents.forEach(function (event, i) {
      // check events validity
      if (!_this.isValidEvent(event)) throw new Error('Graph Event ' + i + ' is not valid.');
    });

    this.events = graphEvents;

    // init
    this.elements = [];

    // make a network
    this.parseEvents(graphEvents);
  }

  _createClass(Graph, [{
    key: 'parseEvents',
    value: function parseEvents(graphEvents) {
      var _this2 = this;

      graphEvents
      // .sort((a,b) => b.ts -a.ts ) // sort by timestamp
      .forEach(function (event) {
        _this2.parseEvent(event.instruction);
      });
    }
  }, {
    key: 'parseEvent',
    value: function parseEvent(instruction) {
      if (instruction.action === "create") this.addElements(instruction.data);else if (instruction.action === "update") this.updateElements(instruction.selector, instruction.data);else if (instruction.action === "delete") this.deleteElements(instruction.selector);else throw Error('Action ' + instruction.action + ' not implement yet');
    }
  }, {
    key: 'addElements',
    value: function addElements(els) {
      var _this3 = this;

      els.forEach(function (el) {
        return _this3.elements.push(el);
      });
    }
  }, {
    key: 'updateElements',
    value: function updateElements(selector, data) {

      // make sure selector is an object
      if (!(typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) === 'object') {
        throw Error('Selector ' + (typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) + ':' + selector + ' should be an Object');
      }

      // copy for immutability
      var elements = JSON.parse(JSON.stringify(this.elements));

      //reassigned without selected nodes
      var els = elements.map(function (el) {
        Object.keys(selector).forEach(function (k) {
          return el[k] === selector[k] ? // if any value correspond to the filter
          Object.assign(el, data) // apply this value
          : el;
        });
        return el;
      });

      this.elements = els;
    }
  }, {
    key: 'deleteElements',
    value: function deleteElements(selector) {

      // make sure selector is valid
      if (!(typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) === 'object') {
        throw Error('Selector ' + (typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) + ':' + selector + ' should be an Object');
      }

      // copy for immutability
      var elements = JSON.parse(JSON.stringify(this.elements));

      // filter out selected nodes
      var els = elements.filter(function (el) {
        return !(0, _deepEqual2.default)(Object.keys(selector).filter(function (k) {
          return el[k] === selector[k];
        }), Object.keys(selector));
      });
      this.elements = els;
    }

    // getter functions

  }, {
    key: 'nodes',
    value: function nodes() {
      return this.elements.filter(function (el) {
        return el.type === 'node';
      });
    }
  }, {
    key: 'edges',
    value: function edges() {
      return this.elements.filter(function (el) {
        return el.type === 'edge';
      });
    }

    /**
    * Check if an event is valid
    * @name isValidEvent
    * @param {Object} event a GraphEvent object
    * @return {Boolean} validty
    */

  }, {
    key: 'isValidEvent',
    value: function isValidEvent(event) {

      if (!(typeof event === 'undefined' ? 'undefined' : _typeof(event)) === "object" || !Object.keys(event).length) {
        throw new Error('Graph Event timestamp is empty or not valid.');
      }

      if (!_typeof(event.ts) === "number") {
        throw new Error('Graph Event timestamp ' + _typeof(event.ts) + ':' + event.ts + ' is not valid.');
      }

      if (!_typeof(event.id) === "string") {
        throw new Error('Graph Event id ' + event.id + ' is not valid.');
      }

      if (!_typeof(event.instruction) === "object") {
        throw new Error('Graph Event instructions ' + event.instruction + ' is not valid.');
      }

      return true;
    }
  }]);

  return Graph;
}();

exports.default = Graph;