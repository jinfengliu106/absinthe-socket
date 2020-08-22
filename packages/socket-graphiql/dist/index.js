import "core-js/modules/es6.array.for-each";
import "core-js/modules/es6.string.iterator";
import "core-js/modules/es6.map";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import "core-js/modules/es7.symbol.async-iterator";
import "core-js/modules/es6.symbol";
import "core-js/modules/es6.array.iterator";
import "core-js/modules/web.dom.iterable";
import "core-js/modules/es6.array.find";
import "core-js/modules/es6.function.bind";
import _newArrowCheck from "@babel/runtime/helpers/newArrowCheck";
import {observe, cancel, create, send} from "@absinthe/socket";
import {requestFromCompat, getOperationType} from "@jumpn/utils-graphql";
import {Socket} from "phoenix";

const _this;

const observe$1 = function observe$$1(subscriptionsClient, notifier, callback) {
  const _this2 = this;

  _newArrowCheck(this, _this);

  return observe(subscriptionsClient.absintheSocket, notifier, {
    onAbort: callback,
    onResult: function onResult(result) {
      _newArrowCheck(this, _this2);

      return callback(null, result);
    }.bind(this)
  });
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

const cancel$1 = function cancel$$1(subscriptionsClient, notifier) {
  _newArrowCheck(this, _this);

  cancel(subscriptionsClient.absintheSocket, notifier);
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

      this.absintheSocket = create(new Socket(socketUrl, options));
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
          let notifier = send(
            this.absintheSocket,
            requestFromCompat(requestCompat)
          );
          const requestKey = storeRequestIfNeeded(this, notifier.request);
          observe$1(this, notifier, callback);
          return requestKey;
        }
      },
      {
        key: "unsubscribe",
        value: function unsubscribe(requestKey) {
          let request = findRequest(this, requestKey);

          if (request) {
            let notifier = findNotifier(this, request);
            if (notifier) cancel$1(this, notifier);
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

              return cancel$1(this, notifier);
            }
          );
        }
      }
    ]);

    return SubscriptionsClient;
  })();

const _this$1;

const parseIfJson = function parseIfJson(text) {
  _newArrowCheck(this, _this$1);

  try {
    return JSON.parse(text);
  } catch (error) {
    return text;
  }
}.bind(undefined);

const responseToText = function responseToText(response) {
  _newArrowCheck(this, _this$1);

  return response.text();
}.bind(undefined);

const postJson = function postJson(url, body) {
  _newArrowCheck(this, _this$1);

  return fetch(url, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body),
    credentials: "include"
  })
    .then(responseToText)
    .then(parseIfJson);
}.bind(undefined);

const getSubscribeCallback = function getSubscribeCallback(observer) {
  const _this2 = this;

  _newArrowCheck(this, _this$1);

  return function(error, result) {
    _newArrowCheck(this, _this2);

    if (error) {
      observer.error(error);
    } else {
      observer.next(result);
    }
  }.bind(this);
}.bind(undefined);

const subscribeWithObservable = function subscribeWithObservable(
  state,
  subscriptionsClient,
  subscriptionSentMessage,
  gqlRequestCompat
) {
  const _this3 = this;

  _newArrowCheck(this, _this$1);

  return {
    subscribe: function subscribe(observer) {
      _newArrowCheck(this, _this3);

      observer.next(subscriptionSentMessage);
      state.activeSubscriptionId = subscriptionsClient.subscribe(
        gqlRequestCompat,
        getSubscribeCallback(observer)
      );
    }.bind(this)
  };
}.bind(undefined);
/**
 * Creates a Fetcher using the given arguments
 */

let createFetcher = function createFetcher(
  apiUrl,
  subscriptionsClient,
  subscriptionSentMessage
) {
  const _this4 = this;

  _newArrowCheck(this, _this$1);

  const state = {
    activeSubscriptionId: undefined
  };
  return function(gqlRequestCompat) {
    _newArrowCheck(this, _this4);

    if (state.activeSubscriptionId) {
      subscriptionsClient.unsubscribe(state.activeSubscriptionId);
    }

    return getOperationType(gqlRequestCompat.query) !== "subscription"
      ? postJson(apiUrl, gqlRequestCompat)
      : subscribeWithObservable(
          state,
          subscriptionsClient,
          subscriptionSentMessage,
          gqlRequestCompat
        );
  }.bind(this);
}.bind(undefined);

export {createFetcher, SubscriptionsClient};
// # sourceMappingURL=index.js.map
