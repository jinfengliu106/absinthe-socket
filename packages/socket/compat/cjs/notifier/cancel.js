'use strict';

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
require('core-js/modules/es6.function.bind');
var _newArrowCheck = require('@babel/runtime/helpers/newArrowCheck');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _objectWithoutProperties__default = /*#__PURE__*/_interopDefaultLegacy(_objectWithoutProperties);
var _newArrowCheck__default = /*#__PURE__*/_interopDefaultLegacy(_newArrowCheck);

var _this = undefined;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty__default['default'](target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var cancel = function cancel(_ref) {
  var activeObservers = _ref.activeObservers,
      canceledObservers = _ref.canceledObservers,
      rest = _objectWithoutProperties__default['default'](_ref, ["activeObservers", "canceledObservers"]);

  _newArrowCheck__default['default'](this, _this);

  return _objectSpread(_objectSpread({}, rest), {}, {
    isActive: false,
    activeObservers: [],
    canceledObservers: [].concat(_toConsumableArray__default['default'](activeObservers), _toConsumableArray__default['default'](canceledObservers))
  });
}.bind(undefined);

module.exports = cancel;
//# sourceMappingURL=cancel.js.map
