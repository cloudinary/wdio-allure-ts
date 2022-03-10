import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

const ENABLED_ELEMENT_SELECTOR: string = "//button[@id='click_to_enable_second_button']";
const DISABLED_ELEMENT_SELECTOR: string = "//button[@id='disabled_button']";
const NOT_EXISTS_ELEMENT_SELECTOR: string = "//button[@id='disabled_button1234']";
describeCommon('waitForEnabled', () => {
  it('element enabled', async () => {
    await Reporter.step('click an element');
    await BrowserUtils.click(ENABLED_ELEMENT_SELECTOR);

    await Reporter.step('Wait for enabled');
    await BrowserUtils.waitForEnabled(ENABLED_ELEMENT_SELECTOR);
  });
  it('element disabled', async () => {
    await Reporter.step('disabled element throws an error');
    await chai
      .expect(BrowserUtils.waitForEnabled(DISABLED_ELEMENT_SELECTOR))
      .to.rejectedWith(Error, `Element not enabled`);
  });
  it('element not exists', async () => {
    await Reporter.step('not existing element throws an error');
    await chai.expect(BrowserUtils.waitForEnabled(NOT_EXISTS_ELEMENT_SELECTOR)).to.rejectedWith(Error);
  });
});
