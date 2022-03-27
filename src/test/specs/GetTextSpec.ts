import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

/**
 * wdio-allure-ts getText tests
 */
describeCommon('GetText of BrowserUtils Tests', () => {
  it('Validate single result ', async () => {
    await Reporter.step('Validate returned getText value of single element');
    chai.assert.equal(await BrowserUtils.getText("//*[@id='GetTextSection-1']/p[1]/button"), 'Open tab');
  });

  it('Validate multiple result select first one ', async () => {
    await Reporter.step('Validate returned getText value when multiple element match');
    chai.assert.equal(await BrowserUtils.getText("//*[@data-test='text-field_gt-1']"), 'Cloudinary 1');
  });

  it('Validate element not exist error thrown', async () => {
    await Reporter.step('GetText throws an error if element not exists');
    await chai.expect(BrowserUtils.getText("//*[@id='not-Exists']")).to.rejectedWith(Error);
  });
});
