[![Build Status](https://travis-ci.org/userpixel/callifexists.svg?branch=master)](https://travis-ci.org/userpixel/callifexists)
[![GitHub issues](https://img.shields.io/github/issues/userpixel/callifexists.svg)](https://github.com/userpixel/callifexists/issues)
[![Version](https://img.shields.io/npm/v/callifexists.svg?style=flat-square)](http://npm.im/callifexists)
[![Downloads](https://img.shields.io/npm/dm/callifexists.svg?style=flat-square)](http://npm-stat.com/charts.html?package=callifexists&from=2017-01-01)
[![MIT License](https://img.shields.io/npm/l/callifexists.svg?style=flat-square)](http://opensource.org/licenses/MIT)

# Intro

It's a dead simple tool for calling an optional callback function only when it is defined.
Its most important use case it to call optional callback functions.

* No dependencies
* Well tested
* Minimal & performant
* Pure functions (no side effects)
* Works in node and browser (using *Webpack*, *Browserify* or anything else that understands commonjs)
* Works with `class` methods, `Promise`, arrow functions, `...` rest parameters, `eval()` and `new Function`.

# Usage

## API

The API is exported with commonjs format so:

```javascript
const { callIfExists, callIfFn, callIfFnThrow, isFunction, throwIfNotFunction } = require('callifexists');
```

### `callIfExists(fn, ...params)`

Is just an aliwas to `callIfFn`!

### `callIfFn(fn, ...params)`

*Aliased to `callIfExists`*

Calls `fn` passing all parameters you specified.

```javascript
function sqr(x) { return x * x; }
const mult = (a, b) => a * b;
const multiplalala = 'this is not a function';
callIfFn(sqr, 3); // returns 9
callIfFn(mult, 5, 4); // 20
callIfFn(multiplalala, 5, 4); // undefined
```

It returns whatever the function returns. So if the function returns a `Promise`, it'll return that
as  well.
If `fn` is not a function, `undefined` is returned.

```javascript
const fn = Math.random() < 0.5 ? 'some string' : () => 'Stockholm';
callIfFn(fn); // may return undefined or 'Stockholm' with a 50-50 chance!
```

So there's no way to know if the function was defined but returned `undefined` or the value passed
for `fn` was set to a non-function value.
If you want, you can use `callIfFnThrow` 👇 which throws if `fn` is not a function.

For usages of `this` see the documentation below.

### `callIfFnThrow(fn, ...params)`

Same as 👆 but will throw if `fn` is not a function.

```javascript
const fn = 'Гётеборг';
callIfFn(fn); // throws Error('callIfFnThrow fn parameter was supposed to be a function but it's string')
```

### isFunction(fn)

This is a utility function that is used internally but is useful on its own.
Returns `true` if `fn` is a function (otherwise returns `false`).

```javascript
isFunction(() => 'Alex'); // returns true
isFunction(eval); // true
isFunction(null); // false
isFunction({}); // false
isFunction(13); // false
```

### throwIfNotFunction(fn, descriptor = 'function') {
  
Same as 👆 but instead of returning, it'll just throw if `fn` is not a function.
The `descriptor` parameter can be used to generate a more meaningful error message.

```javascript
const obj = {name: 'Alex'};
throwIfNotFunction(obj, 'databaseCallback'); // throws databaseCallback was supposed to be a function but it's object`);
```

## `this`

*Note: the function by default will be called with the value of `this` for all API functions*

If your function uses `this` there are a couple of ways to get it right.

#### 1. Use an arrow function

Arrow functions "inherit" `this` from where they were defined:

```javascript
this.name = 'Alex';
const myFn = () => return this.name;
callIfExists(myFn); // returns 'Alex'
```

#### 2. Bind your function

Good old `bind(obj)` can be used to bind `this` in your function to an object you desire:

```javascript
const obj = {
  name: 'Alex'
}
function myFn() {
  return this.name;
}
callIfExists(myFn.bind(obj)); // returns 'Alex'
```

#### 3. Bind API functions

As mentioned above, the functions pass their `this` to your functions. So you can bind it like:

```javascript
const obj = {
  name: 'Alex'
}
function myFn() {
  return this.name;
}
callIfExists.bind(obj)(myFn); // returns 'Alex'
```

# Tests

We use *mocha* and *chai.expect*:

```bash
npm t
```

# Lincense

MIT
