import { assert } from 'chai';
import { TestUtils } from '../..';

describe('TestUtilsSpec', () => {
  it('default random string length', () => {
    const randStr: string = TestUtils.randomString();
    assert.equal(randStr.length, 5);
  });

  it('random string of provided length', () => {
    const randStr: string = TestUtils.randomString(7);
    assert.equal(randStr.length, 7);
  });

  it('strings are randoms', () => {
    const randStr1: string = TestUtils.randomString();
    const randStr2: string = TestUtils.randomString();
    assert.notEqual(randStr1, randStr2);
  });
});
