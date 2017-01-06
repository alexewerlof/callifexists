const { expect } = require('chai');
const { callIfFnThrow } = require('../index');

describe('callIfFnThrow()', () => {
  it('calls the function', () => {
    function f() {
      return 'result';
    }
    expect(callIfFnThrow(f)).to.be.equal('result');
  });

  it('throws if it is not a function', () => {
    expect(() => callIfFnThrow()).to.throw();
  });

  it('throws if the function throws', () => {
    function f() {
      throw new Error('intentional');
    }
    expect(() => callIfFnThrow(f)).to.throw('intentional');
  });
});
