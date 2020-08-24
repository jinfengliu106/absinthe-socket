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
import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import 'core-js/modules/web.dom.iterable';
import 'core-js/modules/es6.array.iterator';
import 'core-js/modules/es6.array.find';
import 'core-js/modules/es6.function.bind';
import _newArrowCheck from '@babel/runtime/helpers/newArrowCheck';
import { observe as observe$1, cancel as cancel$1, send, create } from '@absinthe/socket';
import { requestFromCompat } from '@jumpn/utils-graphql';
import { Socket } from 'phoenix';

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

var SubscriptionsClient = /*#__PURE__*/function () {
  function SubscriptionsClient(socketUrl, options) {
    _classCallCheck(this, SubscriptionsClient);

    _defineProperty(this, "absintheSocket", void 0);

    _defineProperty(this, "requestsCount", 0);

    _defineProperty(this, "requests", void 0);

    this.absintheSocket = create(new Socket(socketUrl, options));
    this.requests = new Map();
  }

  _createClass(SubscriptionsClient, [{
    key: "close",
    value: function close() {
      this.absintheSocket.phoenixSocket.disconnect();
    }
  }, {
    key: "subscribe",
    value: function subscribe(requestCompat, callback) {
      var notifier = send(this.absintheSocket, requestFromCompat(requestCompat));
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
        _newArrowCheck(this, _this4);

        return cancel(this, notifier);
      }.bind(this));
    }
  }]);

  return SubscriptionsClient;
}();

export default SubscriptionsClient;
//# sourceMappingURL=SubscriptionsClient.js.map
