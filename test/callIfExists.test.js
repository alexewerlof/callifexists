const { expect } = require('chai');
const { callIfExists, callIfFn } = require('../index');

describe('callIfExists()', () => {
  it('is an alias to callIfFn', () => {
    expect(callIfExists).to.equal(callIfFn);
  });
});
