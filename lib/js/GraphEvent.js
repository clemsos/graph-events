'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _deepEqual = require('deep-equal');

var _deepEqual2 = _interopRequireDefault(_deepEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *
 * The GraphEvent class is will store a instruction that can be applied to a graph
 * Each commit has a unique ID.
 * Each commit is serializable, to make it easy to be stored and create undo/redo.
 *
 * @name GraphEvent
 * @kind class
 * @param {Object} instruction An instruction
 * @param {String} instruction  A JSON-stringified GraphEvent object
 * @example var commit = new GraphEvent(...)
 */
var GraphEvent = function () {
  function GraphEvent(rawInstruction) {
    _classCallCheck(this, GraphEvent);

    // parse string from raw JSON
    if (typeof rawInstruction == 'string') {
      var _fromJSON = this.fromJSON(rawInstruction),
          id = _fromJSON.id,
          instruction = _fromJSON.instruction,
          ts = _fromJSON.ts;

      this.id = id;
      this.instruction = instruction;
      this.ts = ts;
    } else {
      this.id = _crypto2.default.randomBytes(20).toString('hex');
      this.instruction = rawInstruction;
      var now = new Date();
      this.ts = now.getTime();
    }

    this.isValidEvent(this.instruction);
  }

  /**
  * Check if the instructions passed are valid
  * @name isValidEvent
  * @param {Object} instruction an instruction object
  * @return {Boolean} validty
  */


  _createClass(GraphEvent, [{
    key: 'isValidEvent',
    value: function isValidEvent(instruction) {

      if (!instruction instanceof Object) {
        throw new Error('Wrong event object type :' + (typeof instruction === 'undefined' ? 'undefined' : _typeof(instruction)));
      }

      // check type
      if (!["create", "update", "delete"].includes(instruction.action)) {
        throw new Error('Wrong event action :' + instruction.action);
      }

      // check keys
      var validKeys = ['action'];
      if (instruction.action === "update" || instruction.action === "delete") validKeys.push('selector');
      if (instruction.action === "create" || instruction.action === "update") validKeys.push('data');

      if (!(0, _deepEqual2.default)(Object.keys(instruction).sort(), validKeys.sort())) {
        throw new Error('Wrong instruction data :' + Object.keys(instruction) + '. Excepted : ' + validKeys);
      }

      return true;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return JSON.stringify({ id: this.id, instruction: this.instruction, ts: this.ts });
    }
  }, {
    key: 'fromJSON',
    value: function fromJSON(json) {
      return JSON.parse(json);
    }
  }]);

  return GraphEvent;
}();

exports.default = GraphEvent;