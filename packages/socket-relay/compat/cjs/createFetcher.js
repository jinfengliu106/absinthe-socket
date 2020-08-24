'use strict';

require('core-js/modules/es6.promise');
require('core-js/modules/es6.function.bind');
var _newArrowCheck = require('@babel/runtime/helpers/newArrowCheck');
var socket = require('@absinthe/socket');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _newArrowCheck__default = /*#__PURE__*/_interopDefaultLegacy(_newArrowCheck);

var _this = undefined;

/**
 * Creates a Fetcher (Relay FetchFunction) using the given AbsintheSocket
 * instance
 */
var createFetcher = function createFetcher(absintheSocket, onError) {
  var _this2 = this;

  _newArrowCheck__default['default'](this, _this);

  return function (_ref, variables) {
    var _this3 = this;

    var operation = _ref.text;

    _newArrowCheck__default['default'](this, _this2);

    return new Promise(function (resolve, reject) {
      _newArrowCheck__default['default'](this, _this3);

      return (// $FlowFixMe: operation is always defined
        socket.observe(absintheSocket, socket.send(absintheSocket, {
          operation: operation,
          variables: variables
        }), {
          onError: onError,
          onAbort: reject,
          onResult: resolve
        })
      );
    }.bind(this));
  }.bind(this);
}.bind(undefined);

module.exports = createFetcher;
//# sourceMappingURL=createFetcher.js.map
