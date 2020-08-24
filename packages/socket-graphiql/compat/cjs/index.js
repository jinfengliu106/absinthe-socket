'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('core-js/modules/es6.function.bind');
var _newArrowCheck = require('@babel/runtime/helpers/newArrowCheck');
var utilsGraphql = require('@jumpn/utils-graphql');
require('core-js/modules/es6.array.is-array');
require('core-js/modules/es7.symbol.async-iterator');
require('core-js/modules/es6.symbol');
require('core-js/modules/es6.array.from');
require('core-js/modules/es6.function.name');
require('core-js/modules/es6.regexp.to-string');
require('core-js/modules/es6.date.to-string');
require('core-js/modules/es6.array.for-each');
require('core-js/modules/es6.string.iterator');
require('core-js/modules/es6.map');
var _classCallCheck = require('@babel/runtime/helpers/classCallCheck');
var _createClass = require('@babel/runtime/helpers/createClass');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
require('core-js/modules/web.dom.iterable');
require('core-js/modules/es6.array.iterator');
require('core-js/modules/es6.array.find');
var withAbsintheSocket = require('@absinthe/socket');
var phoenix = require('phoenix');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _newArrowCheck__default = /*#__PURE__*/_interopDefaultLegacy(_newArrowCheck);
var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);

var _this = undefined;

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var observe = function observe(subscriptionsClient, notifier, callback) {
  var _this2 = this;

  _newArrowCheck__default['default'](this, _this);

  return withAbsintheSocket.observe(subscriptionsClient.absintheSocket, notifier, {
    onAbort: callback,
    onResult: function onResult(result) {
      _newArrowCheck__default['default'](this, _this2);

      return callback(null, result);
    }.bind(this)
  });
}.bind(undefined);

var generateRequestKey = function generateRequestKey(subscriptionsClient) {
  _newArrowCheck__default['default'](this, _this);

  subscriptionsClient.requestsCount += 1;
  return String(subscriptionsClient.requestsCount);
}.bind(undefined);

var storeRequest = function storeRequest(subscriptionsClient, request) {
  _newArrowCheck__default['default'](this, _this);

  var requestKey = generateRequestKey(subscriptionsClient);
  subscriptionsClient.requests.set(request, requestKey);
  return requestKey;
}.bind(undefined);

var storeRequestIfNeeded = function storeRequestIfNeeded(subscriptionsClient, request) {
  _newArrowCheck__default['default'](this, _this);

  var requestKey = subscriptionsClient.requests.get(request);
  return requestKey !== undefined ? requestKey : storeRequest(subscriptionsClient, request);
}.bind(undefined);

var findNotifier = function findNotifier(subscriptionsClient, request) {
  var _this3 = this;

  _newArrowCheck__default['default'](this, _this);

  return subscriptionsClient.absintheSocket.notifiers.find(function (notifier) {
    _newArrowCheck__default['default'](this, _this3);

    return notifier.request === request;
  }.bind(this));
}.bind(undefined); // eslint-disable-next-line consistent-return


var findRequest = function findRequest(subscriptionsClient, requestKey) {
  _newArrowCheck__default['default'](this, _this);

  var _iterator = _createForOfIteratorHelper(subscriptionsClient.requests.entries()),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _slicedToArray__default['default'](_step.value, 2),
          request = _step$value[0],
          key = _step$value[1];

      if (key === requestKey) return request;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}.bind(undefined);

var cancel = function cancel(subscriptionsClient, notifier) {
  _newArrowCheck__default['default'](this, _this);

  withAbsintheSocket.cancel(subscriptionsClient.absintheSocket, notifier);
  subscriptionsClient.requests.delete(notifier.request);
}.bind(undefined);

var SubscriptionsClient = /*#__PURE__*/function () {
  function SubscriptionsClient(socketUrl, options) {
    _classCallCheck__default['default'](this, SubscriptionsClient);

    _defineProperty__default['default'](this, "absintheSocket", void 0);

    _defineProperty__default['default'](this, "requestsCount", 0);

    _defineProperty__default['default'](this, "requests", void 0);

    this.absintheSocket = withAbsintheSocket.create(new phoenix.Socket(socketUrl, options));
    this.requests = new Map();
  }

  _createClass__default['default'](SubscriptionsClient, [{
    key: "close",
    value: function close() {
      this.absintheSocket.phoenixSocket.disconnect();
    }
  }, {
    key: "subscribe",
    value: function subscribe(requestCompat, callback) {
      var notifier = withAbsintheSocket.send(this.absintheSocket, utilsGraphql.requestFromCompat(requestCompat));
      var requestKey = storeRequestIfNeeded(this, notifier.request);
      observe(this, notifier, callback);
      return requestKey;
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(requestKey) {
      var request = findRequest(this, requestKey);

      if (request) {
        var notifier = findNotifier(this, request);
        if (notifier) cancel(this, notifier);
      }
    }
  }, {
    key: "unsubscribeAll",
    value: function unsubscribeAll() {
      var _this4 = this;

      this.absintheSocket.notifiers.forEach(function (notifier) {
        _newArrowCheck__default['default'](this, _this4);

        return cancel(this, notifier);
      }.bind(this));
    }
  }]);

  return SubscriptionsClient;
}();

var _this$1 = undefined;

var parseIfJson = function parseIfJson(text) {
  _newArrowCheck__default['default'](this, _this$1);

  try {
    return JSON.parse(text);
  } catch (error) {
    return text;
  }
}.bind(undefined);

var responseToText = function responseToText(response) {
  _newArrowCheck__default['default'](this, _this$1);

  return response.text();
}.bind(undefined);

var postJson = function postJson(url, body) {
  _newArrowCheck__default['default'](this, _this$1);

  return fetch(url, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body),
    credentials: "include"
  }).then(responseToText).then(parseIfJson);
}.bind(undefined);

var getSubscribeCallback = function getSubscribeCallback(observer) {
  var _this2 = this;

  _newArrowCheck__default['default'](this, _this$1);

  return function (error, result) {
    _newArrowCheck__default['default'](this, _this2);

    if (error) {
      observer.error(error);
    } else {
      observer.next(result);
    }
  }.bind(this);
}.bind(undefined);

var subscribeWithObservable = function subscribeWithObservable(state, subscriptionsClient, subscriptionSentMessage, gqlRequestCompat) {
  var _this3 = this;

  _newArrowCheck__default['default'](this, _this$1);

  return {
    subscribe: function subscribe(observer) {
      _newArrowCheck__default['default'](this, _this3);

      observer.next(subscriptionSentMessage);
      state.activeSubscriptionId = subscriptionsClient.subscribe(gqlRequestCompat, getSubscribeCallback(observer));
    }.bind(this)
  };
}.bind(undefined);
/**
 * Creates a Fetcher using the given arguments
 */


var createFetcher = function createFetcher(apiUrl, subscriptionsClient, subscriptionSentMessage) {
  var _this4 = this;

  _newArrowCheck__default['default'](this, _this$1);

  var state = {
    activeSubscriptionId: undefined
  };
  return function (gqlRequestCompat) {
    _newArrowCheck__default['default'](this, _this4);

    if (state.activeSubscriptionId) {
      subscriptionsClient.unsubscribe(state.activeSubscriptionId);
    }

    return utilsGraphql.getOperationType(gqlRequestCompat.query) !== "subscription" ? postJson(apiUrl, gqlRequestCompat) : subscribeWithObservable(state, subscriptionsClient, subscriptionSentMessage, gqlRequestCompat);
  }.bind(this);
}.bind(undefined);

exports.SubscriptionsClient = SubscriptionsClient;
exports.createFetcher = createFetcher;
//# sourceMappingURL=index.js.map
