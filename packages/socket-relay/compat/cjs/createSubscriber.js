'use strict';

require('core-js/modules/es6.function.bind');
var _newArrowCheck = require('@babel/runtime/helpers/newArrowCheck');
var notifierFind = require('@absinthe/socket/dist/notifier/find');
var socket = require('@absinthe/socket');
var utilsPromise = require('@jumpn/utils-promise');
var utilsGraphql = require('@jumpn/utils-graphql');
require('core-js/modules/web.dom.iterable');
require('core-js/modules/es6.array.iterator');
require('core-js/modules/es6.string.iterator');
require('core-js/modules/es6.weak-map');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _newArrowCheck__default = /*#__PURE__*/_interopDefaultLegacy(_newArrowCheck);
var notifierFind__default = /*#__PURE__*/_interopDefaultLegacy(notifierFind);

var subscriptions = new WeakMap();

var _this = undefined;

var unobserveOrCancelIfNeeded = function unobserveOrCancelIfNeeded(absintheSocket, notifier, observer) {
  _newArrowCheck__default['default'](this, _this);

  if (notifier) {
    socket.unobserveOrCancel(absintheSocket, notifier, observer);
  }
}.bind(undefined);

var createDisposable = function createDisposable(absintheSocket, _ref, observer) {
  var _this2 = this;

  var request = _ref.request;

  _newArrowCheck__default['default'](this, _this);

  return {
    dispose: function dispose() {
      _newArrowCheck__default['default'](this, _this2);

      return unobserveOrCancelIfNeeded(absintheSocket, notifierFind__default['default'](absintheSocket.notifiers, "request", request), observer);
    }.bind(this)
  };
}.bind(undefined);

var onStart = function onStart(deferred) {
  var _this3 = this;

  _newArrowCheck__default['default'](this, _this);

  return function (notifier) {
    _newArrowCheck__default['default'](this, _this3);

    return deferred.resolve(notifier);
  }.bind(this);
}.bind(undefined);

var onAbort = function onAbort(deferred, callback) {
  var _this4 = this;

  _newArrowCheck__default['default'](this, _this);

  return function (error) {
    _newArrowCheck__default['default'](this, _this4);

    // callback is always defined but this is not correctly reflected in
    // SubscribeFunction
    callback && callback(error);
    deferred.reject(error);
  }.bind(this);
}.bind(undefined);
/**
 * Creates a Subscriber (Relay SubscribeFunction) using the given AbsintheSocket
 * instance
 */


var createSubscriber = function createSubscriber(absintheSocket, onRecoverableError) {
  var _this5 = this;

  _newArrowCheck__default['default'](this, _this);

  return function (_ref2, variables, cacheConfig, _ref3) {
    var operation = _ref2.text;
    var OnUnrecoverableError = _ref3.onError,
        onNext = _ref3.onNext;

    _newArrowCheck__default['default'](this, _this5);

    // we need to place this logic here and not in ensureIsSubscription as if we
    // do so, then flow is not able to infer we are validating operation
    if (!operation || utilsGraphql.getOperationType(operation) !== "subscription") {
      throw new Error("Expected subscription, but instead got:\n".concat(operation));
    }

    var notifier = socket.send(absintheSocket, {
      operation: operation,
      variables: variables
    });
    var deferred = utilsPromise.createDeferred();
    var observer = {
      onAbort: onAbort(deferred, OnUnrecoverableError),
      onError: onRecoverableError,
      onResult: onNext,
      onStart: onStart(deferred)
    };
    socket.observe(absintheSocket, notifier, observer);
    var disposable = createDisposable(absintheSocket, notifier, observer);
    subscriptions.set(disposable, deferred.promise);
    return disposable;
  }.bind(this);
}.bind(undefined);

module.exports = createSubscriber;
//# sourceMappingURL=createSubscriber.js.map
