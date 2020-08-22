

Object.defineProperty(exports, "__esModule", {value: true});

function _interopDefault(ex) {
  return ex && typeof ex === "object" && "default" in ex ? ex.default : ex;
}

require("core-js/modules/es6.function.bind");
const _newArrowCheck = _interopDefault(
  require("@babel/runtime/helpers/newArrowCheck")
);
const apolloLink = require("apollo-link");
const socket = require("@absinthe/socket");
const Fun = require("flow-static-land/lib/Fun");
const graphql = require("graphql");

const _this;

const unobserveOrCancelIfNeeded = function unobserveOrCancelIfNeeded(
  absintheSocket,
  notifier,
  observer
) {
  _newArrowCheck(this, _this);

  if (notifier && observer) {
    socket.unobserveOrCancel(absintheSocket, notifier, observer);
  }
}.bind(undefined);

const notifierToObservable = function notifierToObservable(
  absintheSocket,
  onError,
  onStart
) {
  const _this2 = this;

  _newArrowCheck(this, _this);

  return function(notifier) {
    _newArrowCheck(this, _this2);

    return socket.toObservable(absintheSocket, notifier, {
      onError,
      onStart,
      unsubscribe: unobserveOrCancelIfNeeded
    });
  }.bind(this);
}.bind(undefined);

const getRequest = function getRequest(_ref) {
  const query = _ref.query;

  var variables = _ref.variables;

  _newArrowCheck(this, _this);

  return {
    operation: graphql.print(query),
    variables
  };
}.bind(undefined);
/**
 * Creates a terminating ApolloLink to request operations using given
 * AbsintheSocket instance
 */

const createAbsintheSocketLink = function createAbsintheSocketLink(
  absintheSocket,
  onError,
  onStart
) {
  const _this3 = this;

  _newArrowCheck(this, _this);

  return new apolloLink.ApolloLink(
    Fun.compose(
      notifierToObservable(absintheSocket, onError, onStart),
      (request) => {
        _newArrowCheck(this, _this3);

        return socket.send(absintheSocket, request);
      },
      getRequest
    )
  );
}.bind(undefined);

exports.createAbsintheSocketLink = createAbsintheSocketLink;
// # sourceMappingURL=index.js.map
