function isFunction(fn) {
  return typeof fn === 'function';
}

function throwIfNotFunction(fn, descriptor = 'function') {
  const type = typeof fn;
  if (type !== 'function') {
    throw new Error(`${descriptor} was supposed to be a function but it's ${type}`);
  }
}

function callIfFn(fn, ...params) {
  const self = this;
  if (isFunction(fn)) {
    return fn.apply(self, params);
  }
  return undefined;
}

function callIfFnThrow(fn, ...params) {
  const self = this;
  throwIfNotFunction(fn);
  return fn.apply(self, params);
}

exports.isFunction = isFunction;
exports.throwIfNotFunction = throwIfNotFunction;
module.exports.callIfFn = callIfFn;
module.exports.callIfExists = callIfFn;
module.exports.callIfFnThrow = callIfFnThrow;
