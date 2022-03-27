import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

describeCommon('IsDisplayed', () => {
  it('displayed true', async () => {
    await Reporter.step('isDisplayed of displayed element');
    chai.expect(await BrowserUtils.isDisplayed("//*[@id='IsDisplayed']//button[@id='displayed_button']")).to.be.true;
  });

  it('displayed false', async () => {
    await Reporter.step('isDisplayed of hidden element');
    chai.expect(await BrowserUtils.isDisplayed("//*[@id='IsDisplayed']//button[@id='not_displayed_button']")).to.be
      .false;
  });

  it('not exist element', async () => {
    await Reporter.step('isDisplayed element not exist');
    chai.expect(await BrowserUtils.isDisplayed("//*[@id='IsDisplayed']//button[@id='not_such_button']")).to.be.false;
  });
});
