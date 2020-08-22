import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import "core-js/modules/web.dom.iterable";
import "core-js/modules/es6.array.for-each";
import "core-js/modules/es6.function.name";
import {remove} from "@jumpn/utils-array";
import "core-js/modules/es6.array.find-index";
import {hasIn} from "@jumpn/utils-composite";
import "core-js/modules/es6.function.bind";
import _newArrowCheck from "@babel/runtime/helpers/newArrowCheck";

const _this;

const getNotifier = function getNotifier(handlerName, payload) {
  const _this2 = this;

  _newArrowCheck(this, _this);

  return function(observer) {
    _newArrowCheck(this, _this2);

    return observer[handlerName] && observer[handlerName](payload);
  }.bind(this);
}.bind(undefined);

const getHandlerName = function getHandlerName(_ref) {
  const name = _ref.name;

  _newArrowCheck(this, _this);

  return "on".concat(name);
}.bind(undefined);

const notifyAll = function notifyAll(observers, event) {
  _newArrowCheck(this, _this);

  return observers.forEach(getNotifier(getHandlerName(event), event.payload));
}.bind(undefined);

const _this$1;

const getObservers = function getObservers(_ref) {
  const activeObservers = _ref.activeObservers;

  var canceledObservers = _ref.canceledObservers;

  _newArrowCheck(this, _this$1);

  return _toConsumableArray(activeObservers).concat(
    _toConsumableArray(canceledObservers)
  );
}.bind(undefined);

const notify = function notify(notifier, event) {
  _newArrowCheck(this, _this$1);

  notifyAll(getObservers(notifier), event);
  return notifier;
}.bind(undefined);

const _this$2;

const findIndex = function findIndex(
  notifiers,
  key,
  value // $FlowFixMe: flow is having some troubles to match hasIn signature (curry)
) {
  _newArrowCheck(this, _this$2);

  return notifiers.findIndex(hasIn([key], value));
}.bind(undefined);

const _this$3;

const remove$1 = function remove$$1(notifier) {
  const _this2 = this;

  _newArrowCheck(this, _this$3);

  return function(notifiers) {
    _newArrowCheck(this, _this2);

    return remove(
      findIndex(notifiers, "request", notifier.request),
      1,
      notifiers
    );
  }.bind(this);
}.bind(undefined);

const _this$4;

const updateNotifiers = function updateNotifiers(absintheSocket, updater) {
  _newArrowCheck(this, _this$4);

  absintheSocket.notifiers = updater(absintheSocket.notifiers);
  return absintheSocket;
}.bind(undefined);

const eventNames = {
  abort: "Abort",
  cancel: "Cancel",
  error: "Error",
  result: "Result",
  start: "Start"
};

const _this$5;

const createStartEvent = function createStartEvent(payload) {
  _newArrowCheck(this, _this$5);

  return {
    payload,
    name: eventNames.start
  };
}.bind(undefined);

const createResultEvent = function createResultEvent(payload) {
  _newArrowCheck(this, _this$5);

  return {
    payload,
    name: eventNames.result
  };
}.bind(undefined);

const createErrorEvent = function createErrorEvent(payload) {
  _newArrowCheck(this, _this$5);

  return {
    payload,
    name: eventNames.error
  };
}.bind(undefined);

const createCancelEvent = function createCancelEvent() {
  _newArrowCheck(this, _this$5);

  return {
    name: eventNames.cancel,
    payload: undefined
  };
}.bind(undefined);

const createAbortEvent = function createAbortEvent(payload) {
  _newArrowCheck(this, _this$5);

  return {
    payload,
    name: eventNames.abort
  };
}.bind(undefined);

const _this$6;

const abortNotifier = function abortNotifier(absintheSocket, notifier, error) {
  _newArrowCheck(this, _this$6);

  return updateNotifiers(
    absintheSocket,
    remove$1(notify(notifier, createAbortEvent(error)))
  );
}.bind(undefined);

export default abortNotifier;
// # sourceMappingURL=abortNotifier.js.map
