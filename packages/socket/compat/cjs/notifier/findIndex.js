'use strict';

require('core-js/modules/es6.array.find-index');
require('core-js/modules/es6.function.bind');
var _newArrowCheck = require('@babel/runtime/helpers/newArrowCheck');
var utilsComposite = require('@jumpn/utils-composite');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _newArrowCheck__default = /*#__PURE__*/_interopDefaultLegacy(_newArrowCheck);

var _this = undefined;

var findIndex = function findIndex(notifiers, key, value) {
  _newArrowCheck__default['default'](this, _this);

  return (// $FlowFixMe: flow is having some troubles to match hasIn signature (curry)
    notifiers.findIndex(utilsComposite.hasIn([key], value))
  );
}.bind(undefined);

module.exports = findIndex;
//# sourceMappingURL=findIndex.js.map
