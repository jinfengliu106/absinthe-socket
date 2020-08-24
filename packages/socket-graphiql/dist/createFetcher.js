import 'core-js/modules/es6.function.bind';
import _newArrowCheck from '@babel/runtime/helpers/newArrowCheck';
import { getOperationType } from '@jumpn/utils-graphql';
import 'core-js/modules/es6.array.is-array';
import 'core-js/modules/es7.symbol.async-iterator';
import 'core-js/modules/es6.symbol';
import 'core-js/modules/es6.array.from';
import 'core-js/modules/es6.function.name';
import 'core-js/modules/es6.regexp.to-string';
import 'core-js/modules/es6.date.to-string';
import 'core-js/modules/es6.array.for-each';
import 'core-js/modules/es6.string.iterator';
import 'core-js/modules/es6.map';
import '@babel/runtime/helpers/classCallCheck';
import '@babel/runtime/helpers/createClass';
import '@babel/runtime/helpers/defineProperty';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import 'core-js/modules/web.dom.iterable';
import 'core-js/modules/es6.array.iterator';
import 'core-js/modules/es6.array.find';
import { observe as observe$1, cancel as cancel$1 } from '@absinthe/socket';
import 'phoenix';

var _this = undefined;

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var observe = function observe(subscriptionsClient, notifier, callback) {
  var _this2 = this;

  _newArrowCheck(this, _this);

  return observe$1(subscriptionsClient.absintheSocket, notifier, {
    onAbort: callback,
    onResult: function onResult(result) {
      _newArrowCheck(this, _this2);

      return callback(null, result);
    }.bind(this)
  });
}.bind(undefined);

var generateRequestKey = function generateRequestKey(subscriptionsClient) {
  _newArrowCheck(this, _this);

  subscriptionsClient.requestsCount += 1;
  return String(subscriptionsClient.requestsCount);
}.bind(undefined);

var storeRequest = function storeRequest(subscriptionsClient, request) {
  _newArrowCheck(this, _this);

  var requestKey = generateRequestKey(subscriptionsClient);
  subscriptionsClient.requests.set(request, requestKey);
  return requestKey;
}.bind(undefined);

var storeRequestIfNeeded = function storeRequestIfNeeded(subscriptionsClient, request) {
  _newArrowCheck(this, _this);

  var requestKey = subscriptionsClient.requests.get(request);
  return requestKey !== undefined ? requestKey : storeRequest(subscriptionsClient, request);
}.bind(undefined);

var findNotifier = function findNotifier(subscriptionsClient, request) {
  var _this3 = this;

  _newArrowCheck(this, _this);

  return subscriptionsClient.absintheSocket.notifiers.find(function (notifier) {
    _newArrowCheck(this, _this3);

    return notifier.request === request;
  }.bind(this));
}.bind(undefined); // eslint-disable-next-line consistent-return


var findRequest = function findRequest(subscriptionsClient, requestKey) {
  _newArrowCheck(this, _this);

  var _iterator = _createForOfIteratorHelper(subscriptionsClient.requests.entries()),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _slicedToArray(_step.value, 2),
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
  _newArrowCheck(this, _this);

  cancel$1(subscriptionsClient.absintheSocket, notifier);
  subscriptionsClient.requests.delete(notifier.request);
}.bind(undefined);

var _this$1 = undefined;

var parseIfJson = function parseIfJson(text) {
  _newArrowCheck(this, _this$1);

  try {
    return JSON.parse(text);
  } catch (error) {
    return text;
  }
}.bind(undefined);

var responseToText = function responseToText(response) {
  _newArrowCheck(this, _this$1);

  return response.text();
}.bind(undefined);

var postJson = function postJson(url, body) {
  _newArrowCheck(this, _this$1);

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

  _newArrowCheck(this, _this$1);

  return function (error, result) {
    _newArrowCheck(this, _this2);

    if (error) {
      observer.error(error);
    } else {
      observer.next(result);
    }
  }.bind(this);
}.bind(undefined);

var subscribeWithObservable = function subscribeWithObservable(state, subscriptionsClient, subscriptionSentMessage, gqlRequestCompat) {
  var _this3 = this;

  _newArrowCheck(this, _this$1);

  return {
    subscribe: function subscribe(observer) {
      _newArrowCheck(this, _this3);

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

  _newArrowCheck(this, _this$1);

  var state = {
    activeSubscriptionId: undefined
  };
  return function (gqlRequestCompat) {
    _newArrowCheck(this, _this4);

    if (state.activeSubscriptionId) {
      subscriptionsClient.unsubscribe(state.activeSubscriptionId);
    }

    return getOperationType(gqlRequestCompat.query) !== "subscription" ? postJson(apiUrl, gqlRequestCompat) : subscribeWithObservable(state, subscriptionsClient, subscriptionSentMessage, gqlRequestCompat);
  }.bind(this);
}.bind(undefined);

export default createFetcher;
//# sourceMappingURL=createFetcher.js.map
