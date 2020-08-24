import 'core-js/modules/es6.function.bind';
import _newArrowCheck from '@babel/runtime/helpers/newArrowCheck';
import { remove as remove$1 } from '@jumpn/utils-array';
import 'core-js/modules/es6.array.find-index';
import { hasIn } from '@jumpn/utils-composite';

var _this = undefined;

var findIndex = function findIndex(notifiers, key, value) {
  _newArrowCheck(this, _this);

  return (// $FlowFixMe: flow is having some troubles to match hasIn signature (curry)
    notifiers.findIndex(hasIn([key], value))
  );
}.bind(undefined);

var _this$1 = undefined;

var remove = function remove(notifier) {
  var _this2 = this;

  _newArrowCheck(this, _this$1);

  return function (notifiers) {
    _newArrowCheck(this, _this2);

    return remove$1(findIndex(notifiers, "request", notifier.request), 1, notifiers);
  }.bind(this);
}.bind(undefined);

export default remove;
//# sourceMappingURL=remove.js.map
