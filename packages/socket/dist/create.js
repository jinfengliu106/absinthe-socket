import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import "core-js/modules/es6.array.find-index";
import "core-js/modules/web.dom.iterable";
import "core-js/modules/es6.array.for-each";
import "phoenix";
import "core-js/modules/es6.function.name";
import "core-js/modules/es6.array.find";
import {hasIn, map} from "@jumpn/utils-composite";
import {remove, replace} from "@jumpn/utils-array";
import {requestToCompat, errorsToString} from "@jumpn/utils-graphql";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
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

const _this$7;

const handlePush = function handlePush(push, handler) {
  _newArrowCheck(this, _this$7);

  return push
    .receive("ok", handler.onSucceed)
    .receive("error", handler.onError)
    .receive("timeout", handler.onTimeout);
}.bind(undefined);

const _this$8;

const notifyActive = function notifyActive(notifier, event) {
  _newArrowCheck(this, _this$8);

  notifyAll(notifier.activeObservers, event);
  return notifier;
}.bind(undefined);

const _this$9;

const notifyResultEvent = function notifyResultEvent(notifier, result) {
  _newArrowCheck(this, _this$9);

  return notifyActive(notifier, createResultEvent(result));
}.bind(undefined);

const _this$a;

const notifyStartEvent = function notifyStartEvent(notifier) {
  _newArrowCheck(this, _this$a);

  return notifyActive(notifier, createStartEvent(notifier));
}.bind(undefined);

const _this$b;

const find = function find(
  notifiers,
  key,
  value // $FlowFixMe: flow is having some troubles to match hasIn signature (curry)
) {
  _newArrowCheck(this, _this$b);

  return notifiers.find(hasIn([key], value));
}.bind(undefined);

const _this$c;

const getPushHandlerMethodGetter = function getPushHandlerMethodGetter(
  absintheSocket,
  request
) {
  const _this2 = this;

  _newArrowCheck(this, _this$c);

  return function(handle) {
    const _this3 = this;

    _newArrowCheck(this, _this2);

    return function() {
      _newArrowCheck(this, _this3);

      const notifier = find(absintheSocket.notifiers, "request", request);

      if (notifier) {
        for (
          var _len = arguments.length, args = new Array(_len), _key = 0;
          _key < _len;
          _key++
        ) {
          args[_key] = arguments[_key];
        }

        handle(...[absintheSocket, notifier].concat(args));
      }
    }.bind(this);
  }.bind(this);
}.bind(undefined);

const getPushHandler = function getPushHandler(
  absintheSocket,
  request,
  notifierPushHandler
) {
  _newArrowCheck(this, _this$c);

  return map(
    getPushHandlerMethodGetter(absintheSocket, request),
    notifierPushHandler
  );
}.bind(undefined);

const pushAbsintheEvent = function pushAbsintheEvent(
  absintheSocket,
  request,
  notifierPushHandler,
  absintheEvent
) {
  _newArrowCheck(this, _this$c);

  handlePush(
    absintheSocket.channel.push(absintheEvent.name, absintheEvent.payload),
    getPushHandler(absintheSocket, request, notifierPushHandler)
  );
  return absintheSocket;
}.bind(undefined);

const _this$d;

const refresh = function refresh(notifier) {
  const _this2 = this;

  _newArrowCheck(this, _this$d);

  return function(notifiers) {
    _newArrowCheck(this, _this2);

    return replace(
      findIndex(notifiers, "request", notifier.request),
      [notifier],
      notifiers
    );
  }.bind(this);
}.bind(undefined);

const _this$e;

const refreshNotifier = function refreshNotifier(absintheSocket, notifier) {
  _newArrowCheck(this, _this$e);

  updateNotifiers(absintheSocket, refresh(notifier));
  return notifier;
}.bind(undefined);

const requestStatuses = {
  canceled: "canceled",
  canceling: "canceling",
  pending: "pending",
  sent: "sent",
  sending: "sending"
};

const absintheEventNames = {
  doc: "doc",
  unsubscribe: "unsubscribe"
};

const _this$f;

const createAbsintheUnsubscribeEvent = function createAbsintheUnsubscribeEvent(
  payload
) {
  _newArrowCheck(this, _this$f);

  return {
    payload,
    name: absintheEventNames.unsubscribe
  };
}.bind(undefined);

const createAbsintheDocEvent = function createAbsintheDocEvent(payload) {
  _newArrowCheck(this, _this$f);

  return {
    payload,
    name: absintheEventNames.doc
  };
}.bind(undefined);

const _this$g;

const pushAbsintheDocEvent = function pushAbsintheDocEvent(
  absintheSocket,
  _ref,
  notifierPushHandler
) {
  const request = _ref.request;

  _newArrowCheck(this, _this$g);

  return pushAbsintheEvent(
    absintheSocket,
    request,
    notifierPushHandler,
    createAbsintheDocEvent(requestToCompat(request))
  );
}.bind(undefined);

const setNotifierRequestStatusSending = function setNotifierRequestStatusSending(
  absintheSocket,
  notifier
) {
  _newArrowCheck(this, _this$g);

  return refreshNotifier(
    absintheSocket,
    _objectSpread({}, notifier, {
      requestStatus: requestStatuses.sending
    })
  );
}.bind(undefined);

const createRequestError = function createRequestError(message) {
  _newArrowCheck(this, _this$g);

  return new Error("request: ".concat(message));
}.bind(undefined);

const onTimeout = function onTimeout(absintheSocket, notifier) {
  _newArrowCheck(this, _this$g);

  return notifyActive(
    notifier,
    createErrorEvent(createRequestError("timeout"))
  );
}.bind(undefined);

const onError = function onError(absintheSocket, notifier, errorMessage) {
  _newArrowCheck(this, _this$g);

  return abortNotifier(
    absintheSocket,
    notifier,
    createRequestError(errorMessage)
  );
}.bind(undefined);

const getNotifierPushHandler = function getNotifierPushHandler(onSucceed) {
  _newArrowCheck(this, _this$g);

  return {
    onError,
    onSucceed,
    onTimeout
  };
}.bind(undefined);

const pushRequestUsing = function pushRequestUsing(
  absintheSocket,
  notifier,
  onSucceed
) {
  _newArrowCheck(this, _this$g);

  return pushAbsintheDocEvent(
    absintheSocket,
    setNotifierRequestStatusSending(absintheSocket, notifier),
    getNotifierPushHandler(onSucceed)
  );
}.bind(undefined);

const _this$h;

const notifyCanceled = function notifyCanceled(notifier, event) {
  _newArrowCheck(this, _this$h);

  notifyAll(notifier.canceledObservers, event);
  return notifier;
}.bind(undefined);

const _this$i;

const clearCanceled = function clearCanceled(notifier) {
  _newArrowCheck(this, _this$i);

  return _objectSpread({}, notifier, {
    canceledObservers: []
  });
}.bind(undefined);

const flushCanceled = function flushCanceled(notifier) {
  _newArrowCheck(this, _this$i);

  return notifier.canceledObservers.length > 0
    ? clearCanceled(notifyCanceled(notifier, createCancelEvent()))
    : notifier;
}.bind(undefined);

const _this$j;

const reset = function reset(notifier) {
  _newArrowCheck(this, _this$j);

  return flushCanceled(
    _objectSpread({}, notifier, {
      isActive: true,
      requestStatus: requestStatuses.pending,
      subscriptionId: undefined
    })
  );
}.bind(undefined);

const _this$k;

const onUnsubscribeSucceedCanceled = function onUnsubscribeSucceedCanceled(
  absintheSocket,
  notifier
) {
  _newArrowCheck(this, _this$k);

  return updateNotifiers(absintheSocket, remove$1(flushCanceled(notifier)));
}.bind(undefined);

const onUnsubscribeSucceedActive = function onUnsubscribeSucceedActive(
  absintheSocket,
  notifier
) {
  _newArrowCheck(this, _this$k);

  return subscribe(
    absintheSocket,
    refreshNotifier(absintheSocket, reset(notifier))
  );
}.bind(undefined);

const createUnsubscribeError = function createUnsubscribeError(message) {
  _newArrowCheck(this, _this$k);

  return new Error("unsubscribe: ".concat(message));
}.bind(undefined);

const unsubscribeHandler = {
  onError: function onError$$1(absintheSocket, notifier, errorMessage) {
    _newArrowCheck(this, _this$k);

    return abortNotifier(
      absintheSocket,
      notifier,
      createUnsubscribeError(errorMessage)
    );
  }.bind(undefined),
  onTimeout: function onTimeout(absintheSocket, notifier) {
    _newArrowCheck(this, _this$k);

    return notifyCanceled(
      notifier,
      createErrorEvent(createUnsubscribeError("timeout"))
    );
  }.bind(undefined),
  onSucceed: function onSucceed(absintheSocket, notifier) {
    _newArrowCheck(this, _this$k);

    if (notifier.isActive) {
      onUnsubscribeSucceedActive(absintheSocket, notifier);
    } else {
      onUnsubscribeSucceedCanceled(absintheSocket, notifier);
    }
  }.bind(undefined)
};

const pushAbsintheUnsubscribeEvent = function pushAbsintheUnsubscribeEvent(
  absintheSocket,
  _ref
) {
  const request = _ref.request;

  var subscriptionId = _ref.subscriptionId;

  _newArrowCheck(this, _this$k);

  return pushAbsintheEvent(
    absintheSocket,
    request,
    unsubscribeHandler,
    createAbsintheUnsubscribeEvent({
      subscriptionId
    })
  );
}.bind(undefined);

const unsubscribe = function unsubscribe(absintheSocket, notifier) {
  _newArrowCheck(this, _this$k);

  return pushAbsintheUnsubscribeEvent(
    absintheSocket,
    refreshNotifier(
      absintheSocket,
      _objectSpread({}, notifier, {
        requestStatus: requestStatuses.canceling
      })
    )
  );
}.bind(undefined);

const onSubscribeSucceed = function onSubscribeSucceed(
  absintheSocket,
  notifier,
  _ref2
) {
  const subscriptionId = _ref2.subscriptionId;

  _newArrowCheck(this, _this$k);

  const subscribedNotifier = refreshNotifier(
    absintheSocket,
    _objectSpread({}, notifier, {
      subscriptionId,
      requestStatus: requestStatuses.sent
    })
  );

  if (subscribedNotifier.isActive) {
    notifyStartEvent(subscribedNotifier);
  } else {
    unsubscribe(absintheSocket, subscribedNotifier);
  }
}.bind(undefined);

const onSubscribe = function onSubscribe(absintheSocket, notifier, response) {
  _newArrowCheck(this, _this$k);

  if (response.errors) {
    onError(absintheSocket, notifier, errorsToString(response.errors));
  } else {
    onSubscribeSucceed(absintheSocket, notifier, response);
  }
}.bind(undefined);

var subscribe = function subscribe(absintheSocket, notifier) {
  _newArrowCheck(this, _this$k);

  return pushRequestUsing(absintheSocket, notifier, onSubscribe);
}.bind(undefined);

const onDataMessage = function onDataMessage(absintheSocket, _ref3) {
  const payload = _ref3.payload;

  _newArrowCheck(this, _this$k);

  const notifier = find(
    absintheSocket.notifiers,
    "subscriptionId",
    payload.subscriptionId
  );

  if (notifier) {
    notifyResultEvent(notifier, payload.result);
  }
}.bind(undefined);

const dataMessageEventName = "subscription:data";

const isDataMessage = function isDataMessage(message) {
  _newArrowCheck(this, _this$k);

  return message.event === dataMessageEventName;
}.bind(undefined);

const _this$l;

const setNotifierRequestStatusSent = function setNotifierRequestStatusSent(
  absintheSocket,
  notifier
) {
  _newArrowCheck(this, _this$l);

  return refreshNotifier(
    absintheSocket,
    _objectSpread({}, notifier, {
      requestStatus: requestStatuses.sent
    })
  );
}.bind(undefined);

const onQueryOrMutationSucceed = function onQueryOrMutationSucceed(
  absintheSocket,
  notifier,
  response
) {
  _newArrowCheck(this, _this$l);

  return updateNotifiers(
    absintheSocket,
    remove$1(
      notifyResultEvent(
        setNotifierRequestStatusSent(absintheSocket, notifier),
        response
      )
    )
  );
}.bind(undefined);

const pushQueryOrMutation = function pushQueryOrMutation(
  absintheSocket,
  notifier
) {
  _newArrowCheck(this, _this$l);

  return pushRequestUsing(
    absintheSocket,
    notifyStartEvent(notifier),
    onQueryOrMutationSucceed
  );
}.bind(undefined);

const pushRequest = function pushRequest(absintheSocket, notifier) {
  _newArrowCheck(this, _this$l);

  if (notifier.operationType === "subscription") {
    subscribe(absintheSocket, notifier);
  } else {
    pushQueryOrMutation(absintheSocket, notifier);
  }
}.bind(undefined);

const _this$m;

const createChannelJoinError = function createChannelJoinError(message) {
  _newArrowCheck(this, _this$m);

  return new Error("channel join: ".concat(message));
}.bind(undefined);

const notifyErrorToAllActive = function notifyErrorToAllActive(
  absintheSocket,
  errorMessage
) {
  const _this2 = this;

  _newArrowCheck(this, _this$m);

  return absintheSocket.notifiers.forEach(
    (notifier) => {
      _newArrowCheck(this, _this2);

      return notifyActive(
        notifier,
        createErrorEvent(createChannelJoinError(errorMessage))
      );
    }
  );
}.bind(undefined); // join Push is reused and so the handler
// https://github.com/phoenixframework/phoenix/blob/master/assets/js/phoenix.js#L356

let createChannelJoinHandler = function createChannelJoinHandler(
  absintheSocket
) {
  const _this3 = this;

  _newArrowCheck(this, _this$m);

  return {
    onError: function onError(errorMessage) {
      _newArrowCheck(this, _this3);

      return notifyErrorToAllActive(absintheSocket, errorMessage);
    }.bind(this),
    onSucceed: function onSucceed() {
      const _this4 = this;

      _newArrowCheck(this, _this3);

      return absintheSocket.notifiers.forEach(
        (notifier) => {
          _newArrowCheck(this, _this4);

          return pushRequest(absintheSocket, notifier);
        }
      );
    }.bind(this),
    onTimeout: function onTimeout() {
      _newArrowCheck(this, _this3);

      return notifyErrorToAllActive(absintheSocket, "timeout");
    }.bind(this)
  };
}.bind(undefined);

const joinChannel = function joinChannel(absintheSocket) {
  _newArrowCheck(this, _this$m);

  handlePush(
    absintheSocket.channel.join(),
    createChannelJoinHandler(absintheSocket)
  );
  absintheSocket.channelJoinCreated = true;
  return absintheSocket;
}.bind(undefined);

const _this$n;

const onMessage = function onMessage(absintheSocket) {
  const _this2 = this;

  _newArrowCheck(this, _this$n);

  return function(message) {
    _newArrowCheck(this, _this2);

    if (isDataMessage(message)) {
      onDataMessage(absintheSocket, message);
    }
  }.bind(this);
}.bind(undefined);

const createConnectionCloseError = function createConnectionCloseError() {
  _newArrowCheck(this, _this$n);

  return new Error("connection: close");
}.bind(undefined);

const notifyConnectionCloseError = function notifyConnectionCloseError(notifier) {
  _newArrowCheck(this, _this$n);

  return notify(notifier, createErrorEvent(createConnectionCloseError()));
}.bind(undefined);

const notifierOnConnectionCloseCanceled = function notifierOnConnectionCloseCanceled(
  absintheSocket,
  notifier
) {
  _newArrowCheck(this, _this$n);

  return updateNotifiers(
    absintheSocket,
    remove$1(notifyConnectionCloseError(notifier))
  );
}.bind(undefined);

const notifierOnConnectionCloseActive = function notifierOnConnectionCloseActive(
  absintheSocket,
  notifier
) {
  _newArrowCheck(this, _this$n);

  if (notifier.operationType === "mutation") {
    abortNotifier(absintheSocket, notifier, createConnectionCloseError());
  } else {
    refreshNotifier(
      absintheSocket,
      reset(notifyConnectionCloseError(notifier))
    );
  }
}.bind(undefined);

const notifierOnConnectionClose = function notifierOnConnectionClose(
  absintheSocket
) {
  const _this3 = this;

  _newArrowCheck(this, _this$n);

  return function(notifier) {
    _newArrowCheck(this, _this3);

    if (notifier.isActive) {
      notifierOnConnectionCloseActive(absintheSocket, notifier);
    } else {
      notifierOnConnectionCloseCanceled(absintheSocket, notifier);
    }
  }.bind(this);
}.bind(undefined);

const onConnectionClose = function onConnectionClose(absintheSocket) {
  const _this4 = this;

  _newArrowCheck(this, _this$n);

  return function() {
    _newArrowCheck(this, _this4);

    return absintheSocket.notifiers.forEach(
      notifierOnConnectionClose(absintheSocket)
    );
  }.bind(this);
}.bind(undefined);

const shouldJoinChannel = function shouldJoinChannel(absintheSocket) {
  _newArrowCheck(this, _this$n);

  return (
    !absintheSocket.channelJoinCreated && absintheSocket.notifiers.length > 0
  );
}.bind(undefined);

const onConnectionOpen = function onConnectionOpen(absintheSocket) {
  const _this5 = this;

  _newArrowCheck(this, _this$n);

  return function() {
    _newArrowCheck(this, _this5);

    if (shouldJoinChannel(absintheSocket)) {
      joinChannel(absintheSocket);
    }
  }.bind(this);
}.bind(undefined);

const absintheChannelName = "__absinthe__:control";
/**
 * Creates an Absinthe Socket using the given Phoenix Socket instance
 *
 * @example
 * import * as withAbsintheSocket from "@absinthe/socket";
 * import {Socket as PhoenixSocket} from "phoenix";

 * const absintheSocket = withAbsintheSocket.create(
 *   new PhoenixSocket("ws://localhost:4000/socket")
 * );
 */

const create = function create(phoenixSocket) {
  _newArrowCheck(this, _this$n);

  const absintheSocket = {
    phoenixSocket,
    channel: phoenixSocket.channel(absintheChannelName),
    channelJoinCreated: false,
    notifiers: []
  };
  phoenixSocket.onOpen(onConnectionOpen(absintheSocket));
  phoenixSocket.onClose(onConnectionClose(absintheSocket));
  phoenixSocket.onMessage(onMessage(absintheSocket));
  return absintheSocket;
}.bind(undefined);

export default create;
// # sourceMappingURL=create.js.map
