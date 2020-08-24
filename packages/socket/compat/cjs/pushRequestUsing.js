'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('core-js/modules/es6.object.define-property');
require('core-js/modules/es6.object.define-properties');
require('core-js/modules/es7.object.get-own-property-descriptors');
require('core-js/modules/es6.array.for-each');
require('core-js/modules/es6.array.filter');
require('core-js/modules/web.dom.iterable');
require('core-js/modules/es6.array.iterator');
require('core-js/modules/es6.object.keys');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
require('core-js/modules/es6.function.bind');
var _newArrowCheck = require('@babel/runtime/helpers/newArrowCheck');
var utilsGraphql = require('@jumpn/utils-graphql');
var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
require('core-js/modules/es6.function.name');
var utilsArray = require('@jumpn/utils-array');
require('core-js/modules/es6.array.find-index');
var utilsComposite = require('@jumpn/utils-composite');
require('phoenix');
require('core-js/modules/es6.array.find');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _newArrowCheck__default = /*#__PURE__*/_interopDefaultLegacy(_newArrowCheck);
var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);

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

var getObservers = function getObservers(_ref) {
  var activeObservers = _ref.activeObservers,
      canceledObservers = _ref.canceledObservers;

  _newArrowCheck__default['default'](this, _this$1);

  return [].concat(_toConsumableArray__default['default'](activeObservers), _toConsumableArray__default['default'](canceledObservers));
}.bind(undefined);

var notify = function notify(notifier, event) {
  _newArrowCheck__default['default'](this, _this$1);

  notifyAll(getObservers(notifier), event);
  return notifier;
}.bind(undefined);

var _this$2 = undefined;

var findIndex = function findIndex(notifiers, key, value) {
  _newArrowCheck__default['default'](this, _this$2);

  return (// $FlowFixMe: flow is having some troubles to match hasIn signature (curry)
    notifiers.findIndex(utilsComposite.hasIn([key], value))
  );
}.bind(undefined);

var _this$3 = undefined;

var remove = function remove(notifier) {
  var _this2 = this;

  _newArrowCheck__default['default'](this, _this$3);

  return function (notifiers) {
    _newArrowCheck__default['default'](this, _this2);

    return utilsArray.remove(findIndex(notifiers, "request", notifier.request), 1, notifiers);
  }.bind(this);
}.bind(undefined);

var _this$4 = undefined;

var updateNotifiers = function updateNotifiers(absintheSocket, updater) {
  _newArrowCheck__default['default'](this, _this$4);

  absintheSocket.notifiers = updater(absintheSocket.notifiers);
  return absintheSocket;
}.bind(undefined);

var eventNames = {
  abort: "Abort",
  cancel: "Cancel",
  error: "Error",
  result: "Result",
  start: "Start"
};

var _this$5 = undefined;

var createStartEvent = function createStartEvent(payload) {
  _newArrowCheck__default['default'](this, _this$5);

  return {
    payload: payload,
    name: eventNames.start
  };
}.bind(undefined);

var createResultEvent = function createResultEvent(payload) {
  _newArrowCheck__default['default'](this, _this$5);

  return {
    payload: payload,
    name: eventNames.result
  };
}.bind(undefined);

var createErrorEvent = function createErrorEvent(payload) {
  _newArrowCheck__default['default'](this, _this$5);

  return {
    payload: payload,
    name: eventNames.error
  };
}.bind(undefined);

var createCancelEvent = function createCancelEvent() {
  _newArrowCheck__default['default'](this, _this$5);

  return {
    name: eventNames.cancel,
    payload: undefined
  };
}.bind(undefined);

var createAbortEvent = function createAbortEvent(payload) {
  _newArrowCheck__default['default'](this, _this$5);

  return {
    payload: payload,
    name: eventNames.abort
  };
}.bind(undefined);

var _this$6 = undefined;

var abortNotifier = function abortNotifier(absintheSocket, notifier, error) {
  _newArrowCheck__default['default'](this, _this$6);

  return updateNotifiers(absintheSocket, remove(notify(notifier, createAbortEvent(error))));
}.bind(undefined);

var _this$7 = undefined;

var notifyActive = function notifyActive(notifier, event) {
  _newArrowCheck__default['default'](this, _this$7);

  notifyAll(notifier.activeObservers, event);
  return notifier;
}.bind(undefined);

var _this$8 = undefined;

var handlePush = function handlePush(push, handler) {
  _newArrowCheck__default['default'](this, _this$8);

  return push.receive("ok", handler.onSucceed).receive("error", handler.onError).receive("timeout", handler.onTimeout);
}.bind(undefined);

var _this$9 = undefined;

var find = function find(notifiers, key, value) {
  _newArrowCheck__default['default'](this, _this$9);

  return (// $FlowFixMe: flow is having some troubles to match hasIn signature (curry)
    notifiers.find(utilsComposite.hasIn([key], value))
  );
}.bind(undefined);

var _this$a = undefined;

var getPushHandlerMethodGetter = function getPushHandlerMethodGetter(absintheSocket, request) {
  var _this2 = this;

  _newArrowCheck__default['default'](this, _this$a);

  return function (handle) {
    var _this3 = this;

    _newArrowCheck__default['default'](this, _this2);

    return function () {
      _newArrowCheck__default['default'](this, _this3);

      var notifier = find(absintheSocket.notifiers, "request", request);

      if (notifier) {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        handle.apply(void 0, [absintheSocket, notifier].concat(args));
      }
    }.bind(this);
  }.bind(this);
}.bind(undefined);

var getPushHandler = function getPushHandler(absintheSocket, request, notifierPushHandler) {
  _newArrowCheck__default['default'](this, _this$a);

  return utilsComposite.map(getPushHandlerMethodGetter(absintheSocket, request), notifierPushHandler);
}.bind(undefined);

var pushAbsintheEvent = function pushAbsintheEvent(absintheSocket, request, notifierPushHandler, absintheEvent) {
  _newArrowCheck__default['default'](this, _this$a);

  handlePush(absintheSocket.channel.push(absintheEvent.name, absintheEvent.payload), getPushHandler(absintheSocket, request, notifierPushHandler));
  return absintheSocket;
}.bind(undefined);

var _this$b = undefined;

var refresh = function refresh(notifier) {
  var _this2 = this;

  _newArrowCheck__default['default'](this, _this$b);

  return function (notifiers) {
    _newArrowCheck__default['default'](this, _this2);

    return utilsArray.replace(findIndex(notifiers, "request", notifier.request), [notifier], notifiers);
  }.bind(this);
}.bind(undefined);

var _this$c = undefined;

var refreshNotifier = function refreshNotifier(absintheSocket, notifier) {
  _newArrowCheck__default['default'](this, _this$c);

  updateNotifiers(absintheSocket, refresh(notifier));
  return notifier;
}.bind(undefined);

var requestStatuses = {
  canceled: "canceled",
  canceling: "canceling",
  pending: "pending",
  sent: "sent",
  sending: "sending"
};

var absintheEventNames = {
  doc: "doc",
  unsubscribe: "unsubscribe"
};

var _this$d = undefined;

var createAbsintheUnsubscribeEvent = function createAbsintheUnsubscribeEvent(payload) {
  _newArrowCheck__default['default'](this, _this$d);

  return {
    payload: payload,
    name: absintheEventNames.unsubscribe
  };
}.bind(undefined);

var createAbsintheDocEvent = function createAbsintheDocEvent(payload) {
  _newArrowCheck__default['default'](this, _this$d);

  return {
    payload: payload,
    name: absintheEventNames.doc
  };
}.bind(undefined);

var _this$e = undefined;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty__default['default'](target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var pushAbsintheDocEvent = function pushAbsintheDocEvent(absintheSocket, _ref, notifierPushHandler) {
  var request = _ref.request;

  _newArrowCheck__default['default'](this, _this$e);

  return pushAbsintheEvent(absintheSocket, request, notifierPushHandler, createAbsintheDocEvent(utilsGraphql.requestToCompat(request)));
}.bind(undefined);

var setNotifierRequestStatusSending = function setNotifierRequestStatusSending(absintheSocket, notifier) {
  _newArrowCheck__default['default'](this, _this$e);

  return refreshNotifier(absintheSocket, _objectSpread(_objectSpread({}, notifier), {}, {
    requestStatus: requestStatuses.sending
  }));
}.bind(undefined);

var createRequestError = function createRequestError(message) {
  _newArrowCheck__default['default'](this, _this$e);

  var error = new Error("request: ".concat(message));
  error.object = message;
  return error;
}.bind(undefined);

var onTimeout = function onTimeout(absintheSocket, notifier) {
  _newArrowCheck__default['default'](this, _this$e);

  return notifyActive(notifier, createErrorEvent(createRequestError("timeout")));
}.bind(undefined);

var onError = function onError(absintheSocket, notifier, errorMessage) {
  _newArrowCheck__default['default'](this, _this$e);

  return abortNotifier(absintheSocket, notifier, createRequestError(errorMessage));
}.bind(undefined);

var getNotifierPushHandler = function getNotifierPushHandler(onSucceed) {
  _newArrowCheck__default['default'](this, _this$e);

  return {
    onError: onError,
    onSucceed: onSucceed,
    onTimeout: onTimeout
  };
}.bind(undefined);

var pushRequestUsing = function pushRequestUsing(absintheSocket, notifier, onSucceed) {
  _newArrowCheck__default['default'](this, _this$e);

  return pushAbsintheDocEvent(absintheSocket, setNotifierRequestStatusSending(absintheSocket, notifier), getNotifierPushHandler(onSucceed));
}.bind(undefined);

exports.default = pushRequestUsing;
exports.onError = onError;
//# sourceMappingURL=pushRequestUsing.js.map
