import { describeCommon } from '../TestHelper';

describeCommon('FailedTest', () => {
  it('Test error message', () => {
    throw new Error('TEST ERROR MESSAGE----->');
  });
});
