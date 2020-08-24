'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('core-js/modules/es6.function.bind');
var _newArrowCheck = require('@babel/runtime/helpers/newArrowCheck');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _newArrowCheck__default = /*#__PURE__*/_interopDefaultLegacy(_newArrowCheck);

var eventNames = {
  abort: "Abort",
  cancel: "Cancel",
  error: "Error",
  result: "Result",
  start: "Start"
};

var _this = undefined;

var createStartEvent = function createStartEvent(payload) {
  _newArrowCheck__default['default'](this, _this);

  return {
    payload: payload,
    name: eventNames.start
  };
}.bind(undefined);

var createResultEvent = function createResultEvent(payload) {
  _newArrowCheck__default['default'](this, _this);

  return {
    payload: payload,
    name: eventNames.result
  };
}.bind(undefined);

var createErrorEvent = function createErrorEvent(payload) {
  _newArrowCheck__default['default'](this, _this);

  return {
    payload: payload,
    name: eventNames.error
  };
}.bind(undefined);

var createCancelEvent = function createCancelEvent() {
  _newArrowCheck__default['default'](this, _this);

  return {
    name: eventNames.cancel,
    payload: undefined
  };
}.bind(undefined);

var createAbortEvent = function createAbortEvent(payload) {
  _newArrowCheck__default['default'](this, _this);

  return {
    payload: payload,
    name: eventNames.abort
  };
}.bind(undefined);

exports.createAbortEvent = createAbortEvent;
exports.createCancelEvent = createCancelEvent;
exports.createErrorEvent = createErrorEvent;
exports.createResultEvent = createResultEvent;
exports.createStartEvent = createStartEvent;
//# sourceMappingURL=eventCreators.js.map
