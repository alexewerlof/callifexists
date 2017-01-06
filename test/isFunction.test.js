const { expect } = require('chai');
const { isFunction } = require('../index');

describe('isFunction()', () => {
  it('returns true if the argument is a function', () => {
    function fn1() {}
    const fn2 = function () {};
    const fn3 = () => 'ret';
    // eslint-disable-next-line no-new-func
    const fn4 = new Function('return "ret"');
    class C1 {};
    expect(isFunction(fn1)).to.be.true;
    expect(isFunction(fn2)).to.be.true;
    expect(isFunction(fn3)).to.be.true;
    expect(isFunction(fn4)).to.be.true;
    expect(isFunction(C1)).to.be.true;
  });

  it('returns false for any other typeof javascript variable', () => {
    expect(isFunction(1)).to.be.false;
    expect(isFunction(0)).to.be.false;
    expect(isFunction(NaN)).to.be.false;
    expect(isFunction(null)).to.be.false;
    expect(isFunction({})).to.be.false;
    expect(isFunction(Symbol('foo'))).to.be.false;
    expect(isFunction(true)).to.be.false;
    expect(isFunction(false)).to.be.false;
    expect(isFunction('string')).to.be.false;
    expect(isFunction('')).to.be.false;
  });
});
