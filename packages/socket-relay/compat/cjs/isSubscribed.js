'use strict';

require('core-js/modules/es6.promise');
require('core-js/modules/es6.function.bind');
var _newArrowCheck = require('@babel/runtime/helpers/newArrowCheck');
var utilsPromise = require('@jumpn/utils-promise');
require('core-js/modules/web.dom.iterable');
require('core-js/modules/es6.array.iterator');
require('core-js/modules/es6.string.iterator');
require('core-js/modules/es6.weak-map');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _newArrowCheck__default = /*#__PURE__*/_interopDefaultLegacy(_newArrowCheck);

var subscriptions = new WeakMap();

var _this = undefined;
/**
 * Returns a promise that resolves to `true` in case subscription of given
 * disposable has started or to `false` otherwise
 */

var isSubscribed = function isSubscribed(disposable) {
  _newArrowCheck__default['default'](this, _this);

  var maybeSubscription = subscriptions.get(disposable);
  return maybeSubscription ? utilsPromise.booleanize(maybeSubscription) : Promise.resolve(false);
}.bind(undefined);

module.exports = isSubscribed;
//# sourceMappingURL=isSubscribed.js.map
