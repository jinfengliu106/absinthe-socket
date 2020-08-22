

function _interopDefault(ex) {
  return ex && typeof ex === "object" && "default" in ex ? ex.default : ex;
}

require("core-js/modules/es6.array.for-each");
require("core-js/modules/es6.string.iterator");
require("core-js/modules/es6.map");
const _classCallCheck = _interopDefault(
  require("@babel/runtime/helpers/classCallCheck")
);
const _createClass = _interopDefault(
  require("@babel/runtime/helpers/createClass")
);
const _defineProperty = _interopDefault(
  require("@babel/runtime/helpers/defineProperty")
);
const _slicedToArray = _interopDefault(
  require("@babel/runtime/helpers/slicedToArray")
);
require("core-js/modules/es7.symbol.async-iterator");
require("core-js/modules/es6.symbol");
require("core-js/modules/es6.array.iterator");
require("core-js/modules/web.dom.iterable");
require("core-js/modules/es6.array.find");
require("core-js/modules/es6.function.bind");
const _newArrowCheck = _interopDefault(
  require("@babel/runtime/helpers/newArrowCheck")
);
const withAbsintheSocket = require("@absinthe/socket");
const utilsGraphql = require("@jumpn/utils-graphql");
const phoenix = require("phoenix");

const _this;

const observe = function observe(subscriptionsClient, notifier, callback) {
  const _this2 = this;

  _newArrowCheck(this, _this);

  return withAbsintheSocket.observe(
    subscriptionsClient.absintheSocket,
    notifier,
    {
      onAbort: callback,
      onResult: function onResult(result) {
        _newArrowCheck(this, _this2);

        return callback(null, result);
      }.bind(this)
    }
  );
}.bind(undefined);

const generateRequestKey = function generateRequestKey(subscriptionsClient) {
  _newArrowCheck(this, _this);

  subscriptionsClient.requestsCount += 1;
  return String(subscriptionsClient.requestsCount);
}.bind(undefined);

const storeRequest = function storeRequest(subscriptionsClient, request) {
  _newArrowCheck(this, _this);

  const requestKey = generateRequestKey(subscriptionsClient);
  subscriptionsClient.requests.set(request, requestKey);
  return requestKey;
}.bind(undefined);

const storeRequestIfNeeded = function storeRequestIfNeeded(
  subscriptionsClient,
  request
) {
  _newArrowCheck(this, _this);

  const requestKey = subscriptionsClient.requests.get(request);
  return requestKey !== undefined
    ? requestKey
    : storeRequest(subscriptionsClient, request);
}.bind(undefined);

const findNotifier = function findNotifier(subscriptionsClient, request) {
  const _this3 = this;

  _newArrowCheck(this, _this);

  return subscriptionsClient.absintheSocket.notifiers.find(
    (notifier) => {
      _newArrowCheck(this, _this3);

      return notifier.request === request;
    }
  );
}.bind(undefined); // eslint-disable-next-line consistent-return

const findRequest = function findRequest(subscriptionsClient, requestKey) {
  _newArrowCheck(this, _this);

  let _iteratorNormalCompletion = true;
  let _didIteratorError = false;
  let _iteratorError;

  try {
    for (
      var _iterator = subscriptionsClient.requests.entries()[Symbol.iterator](),
        _step;
      !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
      _iteratorNormalCompletion = true
    ) {
      const _step$value = _slicedToArray(_step.value, 2);

      var request = _step$value[0];

      var key = _step$value[1];

      if (key === requestKey) return request;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}.bind(undefined);

const cancel = function cancel(subscriptionsClient, notifier) {
  _newArrowCheck(this, _this);

  withAbsintheSocket.cancel(subscriptionsClient.absintheSocket, notifier);
  subscriptionsClient.requests.delete(notifier.request);
}.bind(undefined);

const SubscriptionsClient =
  /* #__PURE__ */
  (function() {
    function SubscriptionsClient(socketUrl, options) {
      _classCallCheck(this, SubscriptionsClient);

      _defineProperty(this, "absintheSocket", void 0);

      _defineProperty(this, "requestsCount", 0);

      _defineProperty(this, "requests", void 0);

      this.absintheSocket = withAbsintheSocket.create(
        new phoenix.Socket(socketUrl, options)
      );
      this.requests = new Map();
    }

    _createClass(SubscriptionsClient, [
      {
        key: "close",
        value: function close() {
          this.absintheSocket.phoenixSocket.disconnect();
        }
      },
      {
        key: "subscribe",
        value: function subscribe(requestCompat, callback) {
          let notifier = withAbsintheSocket.send(
            this.absintheSocket,
            utilsGraphql.requestFromCompat(requestCompat)
          );
          const requestKey = storeRequestIfNeeded(this, notifier.request);
          observe(this, notifier, callback);
          return requestKey;
        }
      },
      {
        key: "unsubscribe",
        value: function unsubscribe(requestKey) {
          let request = findRequest(this, requestKey);

          if (request) {
            let notifier = findNotifier(this, request);
            if (notifier) cancel(this, notifier);
          }
        }
      },
      {
        key: "unsubscribeAll",
        value: function unsubscribeAll() {
          let _this4 = this;

          this.absintheSocket.notifiers.forEach(
            (notifier) => {
              _newArrowCheck(this, _this4);

              return cancel(this, notifier);
            }
          );
        }
      }
    ]);

    return SubscriptionsClient;
  })();

module.exports = SubscriptionsClient;
// # sourceMappingURL=SubscriptionsClient.js.map
