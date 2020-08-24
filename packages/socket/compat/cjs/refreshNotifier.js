'use strict';

require('core-js/modules/es6.function.bind');
var _newArrowCheck = require('@babel/runtime/helpers/newArrowCheck');
var utilsArray = require('@jumpn/utils-array');
require('core-js/modules/es6.array.find-index');
var utilsComposite = require('@jumpn/utils-composite');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _newArrowCheck__default = /*#__PURE__*/_interopDefaultLegacy(_newArrowCheck);

var _this = undefined;

var findIndex = function findIndex(notifiers, key, value) {
  _newArrowCheck__default['default'](this, _this);

  return (// $FlowFixMe: flow is having some troubles to match hasIn signature (curry)
    notifiers.findIndex(utilsComposite.hasIn([key], value))
  );
}.bind(undefined);

var _this$1 = undefined;

var refresh = function refresh(notifier) {
  var _this2 = this;

  _newArrowCheck__default['default'](this, _this$1);

  return function (notifiers) {
    _newArrowCheck__default['default'](this, _this2);

    return utilsArray.replace(findIndex(notifiers, "request", notifier.request), [notifier], notifiers);
  }.bind(this);
}.bind(undefined);

var _this$2 = undefined;

var updateNotifiers = function updateNotifiers(absintheSocket, updater) {
  _newArrowCheck__default['default'](this, _this$2);

  absintheSocket.notifiers = updater(absintheSocket.notifiers);
  return absintheSocket;
}.bind(undefined);

var _this$3 = undefined;

var refreshNotifier = function refreshNotifier(absintheSocket, notifier) {
  _newArrowCheck__default['default'](this, _this$3);

  updateNotifiers(absintheSocket, refresh(notifier));
  return notifier;
}.bind(undefined);

module.exports = refreshNotifier;
//# sourceMappingURL=refreshNotifier.js.map
