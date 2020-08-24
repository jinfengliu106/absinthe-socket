'use strict';

require('core-js/modules/es6.function.bind');
var _newArrowCheck = require('@babel/runtime/helpers/newArrowCheck');
require('core-js/modules/web.dom.iterable');
require('core-js/modules/es6.array.for-each');
require('core-js/modules/es6.function.name');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _newArrowCheck__default = /*#__PURE__*/_interopDefaultLegacy(_newArrowCheck);

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

var notifyActive = function notifyActive(notifier, event) {
  _newArrowCheck__default['default'](this, _this$1);

  notifyAll(notifier.activeObservers, event);
  return notifier;
}.bind(undefined);

module.exports = notifyActive;
//# sourceMappingURL=notifyActive.js.map
