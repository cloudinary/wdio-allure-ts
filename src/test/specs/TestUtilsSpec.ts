import { assert } from 'chai';
import { TestUtils } from '../..';

describe('TestUtilsSpec', () => {
  describe('randomStringTest', () => {
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
  describe('getOnlyNumbersFromStringTest', () => {
    it('string begin with numbers and end with letters', () => {
      const str: string = 'abc2de3mnb';
      const expectedNumber = 23;
      assert.equal(Number(TestUtils.getOnlyNumbersFromString(str)), expectedNumber);
    });
  });
});
