import { assert } from 'chai';
import { Reporter, TestUtils } from '../..';

describe('TestUtilsSpec', () => {
  describe('randomStringTest', () => {
    it('default random string length', () => {
      Reporter.step('generate random string');
      const randStr: string = TestUtils.randomString();

      Reporter.step('Validate strings default length');
      assert.equal(randStr.length, 5);
    });

    it('random string of provided length', () => {
      Reporter.step('generate random string with given length');
      const randStr: string = TestUtils.randomString(7);

      Reporter.step('Validate strings length');
      assert.equal(randStr.length, 7);
    });

    it('strings are randoms', () => {
      Reporter.step('generate random string 1');
      const randStr1: string = TestUtils.randomString();

      Reporter.step('generate random string 2');
      const randStr2: string = TestUtils.randomString();

      Reporter.step('Validate strings are not equal');
      assert.notEqual(randStr1, randStr2);
    });

    it('letters only', () => {
      Reporter.step('Generate letters only string');
      const randStr = TestUtils.randomString(5, true);

      Reporter.step('Validate string contains letters only');
      assert.isTrue(!/\d/.test(randStr));
    });
  });

  describe('extractNumbersFromString', () => {
    it('string contains letters and numbers', () => {
      Reporter.step('Validate extractNumbersFromString');
      const str: string = 'abc2de3mnb';
      const expectedNumber = 23;
      assert.equal(Number(TestUtils.extractNumbersFromString(str)), expectedNumber);
    });
  });
  describe('isTimePassed', () => {
    it('expect to return true', () => {
      Reporter.step('Validate isTimePassed - true');
      const expectedDate = new Date(2000, 1);
      assert.isTrue(TestUtils.isTimePassed(expectedDate, 5));
    });

    it('expect to return false', () => {
      Reporter.step('Validate isTimePassed - false');
      const expectedDate = new Date(3000, 1);
      assert.isNotTrue(TestUtils.isTimePassed(expectedDate, 5));
    });
  });
});
