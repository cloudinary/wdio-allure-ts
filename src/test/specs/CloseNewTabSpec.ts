import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

const OPEN_NEW_TAB: string = "//*[@data-test='open-new-tab']";

/**
 * wdio-allure-ts close tab action
 */
describeCommon('CloseNewTabSpec', () => {
  it('open new tab and then close it', async () => {
    await Reporter.step('open new tab');
    await BrowserUtils.click(OPEN_NEW_TAB);

    await Reporter.step('switch focus to new tab');
    let tabIds: Array<string> = await BrowserUtils.getWindowHandles();
    await BrowserUtils.switchToWindow(tabIds[1]);

    await Reporter.step('close tab');
    await BrowserUtils.closeWindow();

    await Reporter.step('switch focus current tab');
    await BrowserUtils.switchToWindow(tabIds[0]);

    await Reporter.step('validate tab is closed (number of tabs is equal to 1)');
    tabIds = await BrowserUtils.getWindowHandles();
    chai.assert.equal(tabIds.length, 1, `expected number of tabs to be 1, but got ${tabIds.length}`);
  });
});
