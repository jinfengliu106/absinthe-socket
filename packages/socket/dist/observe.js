import 'core-js/modules/es6.function.bind';
import _newArrowCheck from '@babel/runtime/helpers/newArrowCheck';
import 'core-js/modules/es6.object.define-property';
import 'core-js/modules/es6.object.define-properties';
import 'core-js/modules/es7.object.get-own-property-descriptors';
import 'core-js/modules/es6.array.for-each';
import 'core-js/modules/es6.array.filter';
import 'core-js/modules/web.dom.iterable';
import 'core-js/modules/es6.array.iterator';
import 'core-js/modules/es6.object.keys';
import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import { replace } from '@jumpn/utils-array';
import 'core-js/modules/es6.array.find-index';
import { hasIn } from '@jumpn/utils-composite';

var _this = undefined;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var observe = function observe(_ref, observer) {
  var activeObservers = _ref.activeObservers,
      rest = _objectWithoutProperties(_ref, ["activeObservers"]);

  _newArrowCheck(this, _this);

  return _objectSpread(_objectSpread({}, rest), {}, {
    activeObservers: [].concat(_toConsumableArray(activeObservers), [observer]),
    isActive: true
  });
}.bind(undefined);

var _this$1 = undefined;

var findIndex = function findIndex(notifiers, key, value) {
  _newArrowCheck(this, _this$1);

  return (// $FlowFixMe: flow is having some troubles to match hasIn signature (curry)
    notifiers.findIndex(hasIn([key], value))
  );
}.bind(undefined);

var _this$2 = undefined;

var refresh = function refresh(notifier) {
  var _this2 = this;

  _newArrowCheck(this, _this$2);

  return function (notifiers) {
    _newArrowCheck(this, _this2);

    return replace(findIndex(notifiers, "request", notifier.request), [notifier], notifiers);
  }.bind(this);
}.bind(undefined);

var _this$3 = undefined;

var updateNotifiers = function updateNotifiers(absintheSocket, updater) {
  _newArrowCheck(this, _this$3);

  absintheSocket.notifiers = updater(absintheSocket.notifiers);
  return absintheSocket;
}.bind(undefined);

var _this$4 = undefined;

var refreshNotifier = function refreshNotifier(absintheSocket, notifier) {
  _newArrowCheck(this, _this$4);

  updateNotifiers(absintheSocket, refresh(notifier));
  return notifier;
}.bind(undefined);

var _this$5 = undefined;

/**
 * Observes given notifier using the provided observer
 *
 * @example
 * import * as withAbsintheSocket from "@absinthe/socket"
 *
 * const logEvent = eventName => (...args) => console.log(eventName, ...args);
 *
 * const updatedNotifier = withAbsintheSocket.observe(absintheSocket, notifier, {
 *   onAbort: logEvent("abort"),
 *   onError: logEvent("error"),
 *   onStart: logEvent("open"),
 *   onResult: logEvent("result")
 * });
 */
var observe$1 = function observe$1(absintheSocket, notifier, observer) {
  _newArrowCheck(this, _this$5);

  return refreshNotifier(absintheSocket, observe(notifier, observer));
}.bind(undefined);

export default observe$1;
//# sourceMappingURL=observe.js.map
