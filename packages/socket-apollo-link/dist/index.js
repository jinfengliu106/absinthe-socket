import "core-js/modules/es6.function.bind";
import _newArrowCheck from "@babel/runtime/helpers/newArrowCheck";
import {ApolloLink} from "apollo-link";
import {send, toObservable, unobserveOrCancel} from "@absinthe/socket";
import {compose} from "flow-static-land/lib/Fun";
import {print} from "graphql";

const _this;

const unobserveOrCancelIfNeeded = function unobserveOrCancelIfNeeded(
  absintheSocket,
  notifier,
  observer
) {
  _newArrowCheck(this, _this);

  if (notifier && observer) {
    unobserveOrCancel(absintheSocket, notifier, observer);
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

    return toObservable(absintheSocket, notifier, {
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
    operation: print(query),
    variables
  };
}.bind(undefined);
/**
 * Creates a terminating ApolloLink to request operations using given
 * AbsintheSocket instance
 */

let createAbsintheSocketLink = function createAbsintheSocketLink(
  absintheSocket,
  onError,
  onStart
) {
  const _this3 = this;

  _newArrowCheck(this, _this);

  return new ApolloLink(
    compose(
      notifierToObservable(absintheSocket, onError, onStart),
      (request) => {
        _newArrowCheck(this, _this3);

        return send(absintheSocket, request);
      },
      getRequest
    )
  );
}.bind(undefined);

export {createAbsintheSocketLink};
// # sourceMappingURL=index.js.map
