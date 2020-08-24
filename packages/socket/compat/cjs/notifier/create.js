'use strict';

require('core-js/modules/es6.function.bind');
var _newArrowCheck = require('@babel/runtime/helpers/newArrowCheck');
var utilsGraphql = require('@jumpn/utils-graphql');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _newArrowCheck__default = /*#__PURE__*/_interopDefaultLegacy(_newArrowCheck);

var requestStatuses = {
  canceled: "canceled",
  canceling: "canceling",
  pending: "pending",
  sent: "sent",
  sending: "sending"
};

var _this = undefined;

var createUsing = function createUsing(request, operationType) {
  _newArrowCheck__default['default'](this, _this);

  return {
    operationType: operationType,
    request: request,
    activeObservers: [],
    canceledObservers: [],
    isActive: true,
    requestStatus: requestStatuses.pending,
    subscriptionId: undefined
  };
}.bind(undefined);

var create = function create(request) {
  _newArrowCheck__default['default'](this, _this);

  return createUsing(request, utilsGraphql.getOperationType(request.operation));
}.bind(undefined);

module.exports = create;
//# sourceMappingURL=create.js.map
