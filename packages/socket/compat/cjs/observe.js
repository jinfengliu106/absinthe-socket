'use strict';

require('core-js/modules/es6.function.bind');
var _newArrowCheck = require('@babel/runtime/helpers/newArrowCheck');
require('core-js/modules/es6.object.define-property');
require('core-js/modules/es6.object.define-properties');
require('core-js/modules/es7.object.get-own-property-descriptors');
require('core-js/modules/es6.array.for-each');
require('core-js/modules/es6.array.filter');
require('core-js/modules/web.dom.iterable');
require('core-js/modules/es6.array.iterator');
require('core-js/modules/es6.object.keys');
var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var utilsArray = require('@jumpn/utils-array');
require('core-js/modules/es6.array.find-index');
var utilsComposite = require('@jumpn/utils-composite');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _newArrowCheck__default = /*#__PURE__*/_interopDefaultLegacy(_newArrowCheck);
var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _objectWithoutProperties__default = /*#__PURE__*/_interopDefaultLegacy(_objectWithoutProperties);

var _this = undefined;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty__default['default'](target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var observe = function observe(_ref, observer) {
  var activeObservers = _ref.activeObservers,
      rest = _objectWithoutProperties__default['default'](_ref, ["activeObservers"]);

  _newArrowCheck__default['default'](this, _this);

  return _objectSpread(_objectSpread({}, rest), {}, {
    activeObservers: [].concat(_toConsumableArray__default['default'](activeObservers), [observer]),
    isActive: true
  });
}.bind(undefined);

var _this$1 = undefined;

var findIndex = function findIndex(notifiers, key, value) {
  _newArrowCheck__default['default'](this, _this$1);

  return (// $FlowFixMe: flow is having some troubles to match hasIn signature (curry)
    notifiers.findIndex(utilsComposite.hasIn([key], value))
  );
}.bind(undefined);

var _this$2 = undefined;

var refresh = function refresh(notifier) {
  var _this2 = this;

  _newArrowCheck__default['default'](this, _this$2);

  return function (notifiers) {
    _newArrowCheck__default['default'](this, _this2);

    return utilsArray.replace(findIndex(notifiers, "request", notifier.request), [notifier], notifiers);
  }.bind(this);
}.bind(undefined);

var _this$3 = undefined;

var updateNotifiers = function updateNotifiers(absintheSocket, updater) {
  _newArrowCheck__default['default'](this, _this$3);

  absintheSocket.notifiers = updater(absintheSocket.notifiers);
  return absintheSocket;
}.bind(undefined);

var _this$4 = undefined;

var refreshNotifier = function refreshNotifier(absintheSocket, notifier) {
  _newArrowCheck__default['default'](this, _this$4);

  updateNotifiers(absintheSocket, refresh(notifier));
  return notifier;
}.bind(undefined);

var _this$5 = undefined;

/**
 * Observes given notifier using the provided observer
 *
 * @example
 * import * as withAbsintheSocket from "@absinthe/socket"
 *
 * const logEvent = eventName => (...args) => console.log(eventName, ...args);
 *
 * const updatedNotifier = withAbsintheSocket.observe(absintheSocket, notifier, {
 *   onAbort: logEvent("abort"),
 *   onError: logEvent("error"),
 *   onStart: logEvent("open"),
 *   onResult: logEvent("result")
 * });
 */
var observe$1 = function observe$1(absintheSocket, notifier, observer) {
  _newArrowCheck__default['default'](this, _this$5);

  return refreshNotifier(absintheSocket, observe(notifier, observer));
}.bind(undefined);

module.exports = observe$1;
//# sourceMappingURL=observe.js.map
