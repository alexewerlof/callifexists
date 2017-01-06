/**
 * Checks if a value is a function or not
 * @param {*} fn - a value to be tested. Hopefully a function!
 * @returns {boolean} true if fn is a function, false otherwise
 */
function isFunction(fn) {
  return typeof fn === 'function';
}

/**
 * Throws if fn is not a function
 * @param {*} fn - a value to be tested. Hopefully a function!
 * @param {string} descriptor ['variable'] - describing what is being tested
 * @throws {Error} a message saying 'descriptor' was of the wrong type (mentioning type of fn)
 * @returns {undefined}
 */
function throwIfNotFunction(fn, descriptor = 'variable') {
  const type = typeof fn;
  if (type !== 'function') {
    throw new Error(`${descriptor} was supposed to be a function but it's ${type}`);
  }
}

/**
 * Calls fn only if it is a function. It passes the provided parameters.
 * @alias callIfExists
 * @param {*} fn - a value to be tested. Hopefully a function!
 * @param {...*} params - parameters to be passed to fn if it were a function
 * @throws {*} it doesn't throw anything but if fn throws, it'll now swallow the exception
 * @returns {undefined|*} returns whatever the fn returns. If fn is not a function, returns undefined
 */
function callIfFn(fn, ...params) {
  const self = this;
  if (isFunction(fn)) {
    return fn.apply(self, params);
  }
  return undefined;
}

/**
 * Calls fn only if it is a function. It passes the provided parameters.
 * @param {*} fn - a value to be tested. Hopefully a function!
 * @param {...*} params - parameters to be passed to fn if it were a function
 * @throws {Error|*} if fn is not a function, it throws Error('callIfFnThrow fn parameter
 *         was supposed to be a function but it's ${typeof fn}').
 *         Also if fn throws, this function will not swallow the exception
 * @returns {*} returns whatever the fn returns.
 */

function callIfFnThrow(fn, ...params) {
  const self = this;
  throwIfNotFunction(fn, 'callIfFnThrow fn parameter');
  return fn.apply(self, params);
}

exports.isFunction = isFunction;
exports.throwIfNotFunction = throwIfNotFunction;
module.exports.callIfFn = callIfFn;
module.exports.callIfExists = callIfFn;
module.exports.callIfFnThrow = callIfFnThrow;
