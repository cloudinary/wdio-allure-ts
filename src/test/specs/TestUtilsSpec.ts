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
    it('letters only', () => {
      const randStr = TestUtils.randomString(5, true);
      assert.isTrue(!/\d/.test(randStr));
    });
  });
  describe('extractNumbersFromString', () => {
    it('string contains letters and numbers', () => {
      const str: string = 'abc2de3mnb';
      const expectedNumber = 23;
      assert.equal(Number(TestUtils.extractNumbersFromString(str)), expectedNumber);
    });
  });
  describe('isTimePassed', () => {
    it('expect to return true', () => {
      const expectedDate = new Date(2000, 1);
      assert.isTrue(TestUtils.isTimePassed(expectedDate, 5));
    });

    it('expect to return false', () => {
      const expectedDate = new Date(3000, 1);
      assert.isNotTrue(TestUtils.isTimePassed(expectedDate, 5));
    });
  });
});
