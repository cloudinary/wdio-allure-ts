import { describeCommon } from '../TestHelper';

describeCommon('Failed Test', () => {
  it('Test error message', () => {
    throw new Error('TEST ERROR MESSAGE----->');
  });
});
