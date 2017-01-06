const { expect } = require('chai');
const { callIfFn } = require('../index');

describe('callIfFn()', () => {
  it('returns undefined if the function is missing', () => {
    expect(callIfFn()).to.be.undefined;
  });

  it('return function result', () => {
    expect(callIfFn(() => 'hello')).to.equal('hello');
  });

  it('return function result even when undefined', () => {
    expect(callIfFn(() => undefined)).to.be.undefined;
  });

  it('passes no parameter if they are missing', () => {
    function fn() {
      return arguments.length;
    }

    expect(callIfFn(fn)).to.equal(0);
  });

  it('passes the parameters to the function', () => {
    function callback(a, b, c) {
      return a === 'a' && b === true && c === 3;
    }
    expect(callIfFn(callback, 'a', true, 3)).to.be.true;
  });

  it('calls the function with the right "this"', () => {
    const self = this;
    function f() {
      return this === self;
    }
    const boundCallIfFn = callIfFn.bind(this);
    expect(boundCallIfFn(f)).to.be.true;
  });

  it('calls a bound function with the right "this"', () => {
    const self = this;
    function f() {
      return this === self;
    }
    const boundFunction = f.bind(this);
    expect(callIfFn(boundFunction)).to.be.true;
  });

  it('honours this in arrow functions', () => {
    const self = this;
    expect(callIfFn(() => this === self)).to.be.true;
  });

  it('suppors functions with rest parameters', () => {
    function f(a, ...params) {
      return a === 'foo' && params.length === 2 && params[0] === 'bar' && params[1] === 'baz';
    }
    expect(callIfFn(f, 'foo', 'bar', 'baz')).to.be.true;
  });

  it('works correctly for functions with default parameters', () => {
    function f(a = 1, b = 2) {
      return a === 1 && b === 2;
    }
    expect(callIfFn(f, 1, 2)).to.be.true;
    expect(callIfFn(f, 1)).to.be.true;
    expect(callIfFn(f, undefined, 2)).to.be.true;
    expect(callIfFn(f)).to.be.true;
  });

  it('behaves correctly when function is missing but params are provided', () => {
    const isCalled = false;
    // eslint-disable-next-line no-unused-vars
    function f(a, b) {
      isCalled = true;
    }
    expect(callIfFn(undefined, 'foo', 'bar')).to.be.undefined;
    expect(isCalled).to.be.false;
  });

  it('works correctly when all arguments are missing', () => {
    function f(a, b) {
      expect(a).to.be.undefined;
      expect(b).to.be.undefined;
      return 'foo';
    }
    expect(callIfFn(f)).to.equal('foo');
  });

  it('works correctly when undefined parameters are passed', () => {
    function f(a, b) {
      expect(a).to.be.undefined;
      expect(b).to.be.undefined;
      expect(arguments.length).to.equal(2);
      return 'foo';
    }
    expect(callIfFn(f, undefined, undefined)).to.equal('foo');
  });

  it('passes all parameters to the function', () => {
    function f() {
      expect(arguments.length).to.equal(3);
      expect(arguments[0]).to.equal('foo');
      expect(arguments[1]).to.equal('bar');
      expect(arguments[2]).to.equal('baz');
      return 'qux';
    }
    expect(callIfFn(f, 'foo', 'bar', 'baz')).to.equal('qux');
  });

  it('throws if the function throws', () => {
    function f() {
      throw new Error('intentional');
    }
    expect(() => callIfFn(f)).to.throw('intentional');
  });

  it('works with functions created using Eval and Function', () => {
    // eslint-disable-next-line no-eval
    const evalFn = eval('(function (a) {return 2 * a})');
    // eslint-disable-next-line no-new-func
    const newFn = new Function('a', 'return 2 * a');
    expect(callIfFn(evalFn, 6)).to.equal(12);
    expect(callIfFn(newFn, -13)).to.equal(-26);
  });

  it('works correctly for rest parameter of arrow functions', () => {
    const f = (a, ...params) => {
      expect(a).to.equal('foo');
      expect(params.length).to.equal(2);
      expect(params[0]).to.equal('bar');
      expect(params[1]).to.equal('baz');
      return 'qux';
    };
    expect(callIfFn(f, 'foo', 'bar', 'baz')).to.equal('qux');
  });

  it('works properly for functions returning promises', (done) => {
    function f(a) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(a), 10);
      });
    }
    const ret = callIfFn(f, 'foo');
    expect(ret).to.be.an.instanceof(Promise);
    expect(ret.then).to.be.a('function');
    ret.then((val) => expect(val).to.equal('foo') && done());
  });

  it('works correctly for a class method', () => {
    class C {
      constructor(greeting) {
        this.greeting = greeting;
      }
      greet(name) {
        expect(name).to.equal('Alex');
        return `${this.greeting} ${name}!`;
      }
    }
    const c = new C('Hello');
    const boundGreet = c.greet.bind(c);
    expect(callIfFn(boundGreet, 'Alex')).to.equal('Hello Alex!');
  });
});
