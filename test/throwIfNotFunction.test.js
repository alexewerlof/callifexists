const { expect } = require('chai');
const { throwIfNotFunction } = require('../index');

describe('throwIfNotFunction()', () => {
  it('does not throw if the argument is a function', () => {
    function fn1() {}
    const fn2 = function () {};
    const fn3 = () => 'ret';
    // eslint-disable-next-line no-new-func
    const fn4 = new Function('return "ret"');
    class C1 {};
    expect(() => throwIfNotFunction(fn1)).to.not.throw();
    expect(() => throwIfNotFunction(fn2)).to.not.throw();
    expect(() => throwIfNotFunction(fn3)).to.not.throw();
    expect(() => throwIfNotFunction(fn4)).to.not.throw();
    expect(() => throwIfNotFunction(C1)).to.not.throw();
  });

  it('throws for any other typeof javascript variable', () => {
    expect(() => throwIfNotFunction(1)).to.throw;
    expect(() => throwIfNotFunction(0)).to.throw;
    expect(() => throwIfNotFunction(NaN)).to.throw;
    expect(() => throwIfNotFunction(null)).to.throw;
    expect(() => throwIfNotFunction({})).to.throw;
    expect(() => throwIfNotFunction(Symbol('foo'))).to.throw;
    expect(() => throwIfNotFunction(true)).to.throw;
    expect(() => throwIfNotFunction(false)).to.throw;
    expect(() => throwIfNotFunction('string')).to.throw;
    expect(() => throwIfNotFunction('')).to.throw;
  });
});
