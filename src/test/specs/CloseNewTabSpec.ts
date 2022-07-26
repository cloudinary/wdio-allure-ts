import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

const OPEN_NEW_TAB: string = "//*[@data-test='open-new-tab']";

/**
 * wdio-allure-ts close tab action
 */
describeCommon('open new tab, and close it', () => {
  it('click on `open new tab button` ', async () => {
    await Reporter.debug('open new tab');
    await BrowserUtils.click(OPEN_NEW_TAB);

    await Reporter.debug('get tabs ids');
    const tabIds: Array<string> = await BrowserUtils.getWindowHandles();

    await Reporter.debug('validate number of tabs');
    chai.assert.equal(tabIds.length, 2, 'Incorrect number of tab ids');
  });

  it('close new tab', async () => {
    await Reporter.step('get tabs ids');
    let tabIds: Array<string> = await BrowserUtils.getWindowHandles();

    await Reporter.step('switch focus to new tab');
    await BrowserUtils.switchToWindow(tabIds[1]);

    await Reporter.step('Validate tab change');
    chai.assert.equal(tabIds[1], await browser.getWindowHandle(), 'Failed to switch tabs');

    await Reporter.step('close tab');
    await BrowserUtils.closeWindow();

    await Reporter.step('switch focus current tab');
    await BrowserUtils.switchToWindow(tabIds[0]);

    await Reporter.debug('validate number of tabs');
    tabIds = await BrowserUtils.getWindowHandles();
    chai.assert.equal(tabIds.length, 1, 'Incorrect number of tab ids');
  });
});
