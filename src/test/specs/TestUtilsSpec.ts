import { assert } from 'chai';
import { Reporter, TestUtils } from '../..';

describe('TestUtilsSpec', () => {
  describe('randomStringTest', () => {
    it('default random string length', async () => {
      await Reporter.step('generate random string');
      const randStr: string = TestUtils.randomString();

      await Reporter.step('Validate strings default length');
      assert.equal(randStr.length, 5);
    });

    it('random string of provided length', async () => {
      await Reporter.step('generate random string with given length');
      const randStr: string = TestUtils.randomString(7);

      await Reporter.step('Validate strings length');
      assert.equal(randStr.length, 7);
    });

    it('strings are randoms', async () => {
      await Reporter.step('generate random string 1');
      const randStr1: string = TestUtils.randomString();

      await Reporter.step('generate random string 2');
      const randStr2: string = TestUtils.randomString();

      await Reporter.step('Validate strings are not equal');
      assert.notEqual(randStr1, randStr2);
    });

    it('letters only', async () => {
      await Reporter.step('Generate letters only string');
      const randStr = TestUtils.randomString(5, true);

      await Reporter.step('Validate string contains letters only');
      assert.isTrue(!/\d/.test(randStr));
    });
  });

  describe('extractNumbersFromString', () => {
    it('string contains letters and numbers', async () => {
      await Reporter.step('Validate extractNumbersFromString');
      const str: string = 'abc2de3mnb';
      const expectedNumber = 23;
      assert.equal(Number(TestUtils.extractNumbersFromString(str)), expectedNumber);
    });
  });
  describe('isTimePassed', () => {
    it('expect to return true', async () => {
      await Reporter.step('Validate isTimePassed - true');
      const expectedDate = new Date(2000, 1);
      assert.isTrue(TestUtils.isTimePassed(expectedDate, 5));
    });

    it('expect to return false', async () => {
      await Reporter.step('Validate isTimePassed - false');
      const expectedDate = new Date(3000, 1);
      assert.isNotTrue(TestUtils.isTimePassed(expectedDate, 5));
    });
  });
});
