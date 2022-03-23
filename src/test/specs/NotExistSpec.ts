import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

/**
 * waitForExist reverse:true
 */
describeCommon('waitForExist reverse:true', () => {
  it('disappearing element', async () => {
    const DISAPPEARING_BUTTON_SELECTOR: string = "//button[@id='not-existing-button']";
    await Reporter.step('Click on disappearing button');
    await (await $(DISAPPEARING_BUTTON_SELECTOR)).click();

    await Reporter.step('Validate element does not exist');
    await BrowserUtils.waitForExist(DISAPPEARING_BUTTON_SELECTOR, { reverse: true });
  });
  it('fail on existing element', async () => {
    const EXISTING_BUTTON_SELECTOR: string = "//button[@id='existing-button']";
    await Reporter.step('existing element throws an error');
    await chai
      .expect(BrowserUtils.waitForExist(EXISTING_BUTTON_SELECTOR, { reverse: true }))
      .to.rejectedWith(Error, 'still existing');
  });
});
