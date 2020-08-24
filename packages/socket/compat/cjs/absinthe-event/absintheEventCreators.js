'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('core-js/modules/es6.function.bind');
var _newArrowCheck = require('@babel/runtime/helpers/newArrowCheck');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _newArrowCheck__default = /*#__PURE__*/_interopDefaultLegacy(_newArrowCheck);

var absintheEventNames = {
  doc: "doc",
  unsubscribe: "unsubscribe"
};

var _this = undefined;

var createAbsintheUnsubscribeEvent = function createAbsintheUnsubscribeEvent(payload) {
  _newArrowCheck__default['default'](this, _this);

  return {
    payload: payload,
    name: absintheEventNames.unsubscribe
  };
}.bind(undefined);

var createAbsintheDocEvent = function createAbsintheDocEvent(payload) {
  _newArrowCheck__default['default'](this, _this);

  return {
    payload: payload,
    name: absintheEventNames.doc
  };
}.bind(undefined);

exports.createAbsintheDocEvent = createAbsintheDocEvent;
exports.createAbsintheUnsubscribeEvent = createAbsintheUnsubscribeEvent;
//# sourceMappingURL=absintheEventCreators.js.map
