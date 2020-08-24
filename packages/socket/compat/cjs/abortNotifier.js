'use strict';

require('core-js/modules/es6.function.bind');
var _newArrowCheck = require('@babel/runtime/helpers/newArrowCheck');
var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
require('core-js/modules/web.dom.iterable');
require('core-js/modules/es6.array.for-each');
require('core-js/modules/es6.function.name');
var utilsArray = require('@jumpn/utils-array');
require('core-js/modules/es6.array.find-index');
var utilsComposite = require('@jumpn/utils-composite');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _newArrowCheck__default = /*#__PURE__*/_interopDefaultLegacy(_newArrowCheck);
var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);

var _this = undefined;

var getNotifier = function getNotifier(handlerName, payload) {
  var _this2 = this;

  _newArrowCheck__default['default'](this, _this);

  return function (observer) {
    _newArrowCheck__default['default'](this, _this2);

    return observer[handlerName] && observer[handlerName](payload);
  }.bind(this);
}.bind(undefined);

var getHandlerName = function getHandlerName(_ref) {
  var name = _ref.name;

  _newArrowCheck__default['default'](this, _this);

  return "on".concat(name);
}.bind(undefined);

var notifyAll = function notifyAll(observers, event) {
  _newArrowCheck__default['default'](this, _this);

  return observers.forEach(getNotifier(getHandlerName(event), event.payload));
}.bind(undefined);

var _this$1 = undefined;

var getObservers = function getObservers(_ref) {
  var activeObservers = _ref.activeObservers,
      canceledObservers = _ref.canceledObservers;

  _newArrowCheck__default['default'](this, _this$1);

  return [].concat(_toConsumableArray__default['default'](activeObservers), _toConsumableArray__default['default'](canceledObservers));
}.bind(undefined);

var notify = function notify(notifier, event) {
  _newArrowCheck__default['default'](this, _this$1);

  notifyAll(getObservers(notifier), event);
  return notifier;
}.bind(undefined);

var _this$2 = undefined;

var findIndex = function findIndex(notifiers, key, value) {
  _newArrowCheck__default['default'](this, _this$2);

  return (// $FlowFixMe: flow is having some troubles to match hasIn signature (curry)
    notifiers.findIndex(utilsComposite.hasIn([key], value))
  );
}.bind(undefined);

var _this$3 = undefined;

var remove = function remove(notifier) {
  var _this2 = this;

  _newArrowCheck__default['default'](this, _this$3);

  return function (notifiers) {
    _newArrowCheck__default['default'](this, _this2);

    return utilsArray.remove(findIndex(notifiers, "request", notifier.request), 1, notifiers);
  }.bind(this);
}.bind(undefined);

var _this$4 = undefined;

var updateNotifiers = function updateNotifiers(absintheSocket, updater) {
  _newArrowCheck__default['default'](this, _this$4);

  absintheSocket.notifiers = updater(absintheSocket.notifiers);
  return absintheSocket;
}.bind(undefined);

var eventNames = {
  abort: "Abort",
  cancel: "Cancel",
  error: "Error",
  result: "Result",
  start: "Start"
};

var _this$5 = undefined;

var createStartEvent = function createStartEvent(payload) {
  _newArrowCheck__default['default'](this, _this$5);

  return {
    payload: payload,
    name: eventNames.start
  };
}.bind(undefined);

var createResultEvent = function createResultEvent(payload) {
  _newArrowCheck__default['default'](this, _this$5);

  return {
    payload: payload,
    name: eventNames.result
  };
}.bind(undefined);

var createErrorEvent = function createErrorEvent(payload) {
  _newArrowCheck__default['default'](this, _this$5);

  return {
    payload: payload,
    name: eventNames.error
  };
}.bind(undefined);

var createCancelEvent = function createCancelEvent() {
  _newArrowCheck__default['default'](this, _this$5);

  return {
    name: eventNames.cancel,
    payload: undefined
  };
}.bind(undefined);

var createAbortEvent = function createAbortEvent(payload) {
  _newArrowCheck__default['default'](this, _this$5);

  return {
    payload: payload,
    name: eventNames.abort
  };
}.bind(undefined);

var _this$6 = undefined;

var abortNotifier = function abortNotifier(absintheSocket, notifier, error) {
  _newArrowCheck__default['default'](this, _this$6);

  return updateNotifiers(absintheSocket, remove(notify(notifier, createAbortEvent(error))));
}.bind(undefined);

module.exports = abortNotifier;
//# sourceMappingURL=abortNotifier.js.map
