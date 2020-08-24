'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('core-js/modules/es6.function.bind');
var _newArrowCheck = require('@babel/runtime/helpers/newArrowCheck');
var apolloLink = require('apollo-link');
var socket = require('@absinthe/socket');
var Fun = require('flow-static-land/lib/Fun');
var graphql = require('graphql');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _newArrowCheck__default = /*#__PURE__*/_interopDefaultLegacy(_newArrowCheck);

var _this = undefined;

var unobserveOrCancelIfNeeded = function unobserveOrCancelIfNeeded(absintheSocket, notifier, observer) {
  _newArrowCheck__default['default'](this, _this);

  if (notifier && observer) {
    socket.unobserveOrCancel(absintheSocket, notifier, observer);
  }
}.bind(undefined);

var notifierToObservable = function notifierToObservable(absintheSocket, onError, onStart) {
  var _this2 = this;

  _newArrowCheck__default['default'](this, _this);

  return function (notifier) {
    _newArrowCheck__default['default'](this, _this2);

    return socket.toObservable(absintheSocket, notifier, {
      onError: onError,
      onStart: onStart,
      unsubscribe: unobserveOrCancelIfNeeded
    });
  }.bind(this);
}.bind(undefined);

var getRequest = function getRequest(_ref) {
  var query = _ref.query,
      variables = _ref.variables;

  _newArrowCheck__default['default'](this, _this);

  return {
    operation: graphql.print(query),
    variables: variables
  };
}.bind(undefined);
/**
 * Creates a terminating ApolloLink to request operations using given
 * AbsintheSocket instance
 */


var createAbsintheSocketLink = function createAbsintheSocketLink(absintheSocket, onError, onStart) {
  var _this3 = this;

  _newArrowCheck__default['default'](this, _this);

  return new apolloLink.ApolloLink(Fun.compose(notifierToObservable(absintheSocket, onError, onStart), function (request) {
    _newArrowCheck__default['default'](this, _this3);

    return socket.send(absintheSocket, request);
  }.bind(this), getRequest));
}.bind(undefined);

exports.createAbsintheSocketLink = createAbsintheSocketLink;
//# sourceMappingURL=index.js.map
