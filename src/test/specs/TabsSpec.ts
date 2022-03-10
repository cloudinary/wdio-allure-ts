import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import { BrowserUtils, Reporter } from '../..';
import { describeCommon, sampleAppUrl } from '../TestHelper';

const OPEN_TAB_BUTTON: string = "//button[@data-test='open-tab-btn']";
/**
 * wdio-allure-ts tab actions test
 */
describeCommon('tab actions', () => {
  it('get tab ids', async () => {
    await Reporter.step('get tab ids');
    let tabIds: Array<string> = await BrowserUtils.getWindowHandles();

    await Reporter.step('validate number of tabs');
    chai.assert.equal(tabIds.length, 1, 'Incorrect number of tab ids');

    await Reporter.step('open new tab');
    await BrowserUtils.click(OPEN_TAB_BUTTON);

    await Reporter.step('get tab ids');
    tabIds = await BrowserUtils.getWindowHandles();

    await Reporter.step('validate number of tabs');
    chai.assert.equal(tabIds.length, 2, 'Incorrect number of tab ids');
  });

  it('switch to tab', async () => {
    await Reporter.step('Navigate to sample app');
    await BrowserUtils.url(sampleAppUrl);

    await Reporter.step('open new tab');
    await BrowserUtils.click(OPEN_TAB_BUTTON);

    await Reporter.step('get tabs ids');
    const tabIds: Array<string> = await BrowserUtils.getWindowHandles();

    await Reporter.step('switch to tab');
    await BrowserUtils.switchToWindow(tabIds[1]);

    await Reporter.step('Validate tab change');
    chai.assert.equal(tabIds[1], await browser.getWindowHandle(), 'Failed to switch tabs');
  });

  it('switch to incorrect window id', async () => {
    const badTabId: string = 'notExistingTabId';
    await Reporter.step('switch to incorrect window id throws an error');
    await chai
      .expect(BrowserUtils.switchToWindow(badTabId))
      .to.rejectedWith(Error, `Failed switch to window by id: '${badTabId}'`);
  });
});
