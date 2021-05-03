import { describeCommon } from '../TestHelper';

describeCommon('acceptAlert', () => {
  it('failed test', () => {
    throw new Error('FAILED TEST--hahaha');
  });
});
