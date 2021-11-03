import { assert, expect } from 'chai';
import { BrowserUtils } from '../..';
import { describeCommon, sampleAppUrl } from '../TestHelper';

const OPEN_TAB_BUTTON: string = "//button[@data-test='open-tab-btn']";
/**
 * wdio-allure-ts tab actions test
 */
describeCommon('tab actions', () => {
  it('get tab ids', () => {
    let tabIds: Array<string> = BrowserUtils.getWindowHandles();
    assert.equal(tabIds.length, 1, 'Incorrect number of tab ids');
    BrowserUtils.click(OPEN_TAB_BUTTON);

    tabIds = BrowserUtils.getWindowHandles();
    assert.equal(tabIds.length, 2, 'Incorrect number of tab ids');
  });

  it('switch to tab', () => {
    BrowserUtils.url(sampleAppUrl);
    BrowserUtils.click(OPEN_TAB_BUTTON);
    const tabIds: Array<string> = BrowserUtils.getWindowHandles();

    BrowserUtils.switchToWindow(tabIds[1]);

    assert.equal(tabIds[1], browser.getWindowHandle(), 'Failed to switch tabs');
  });

  it('switch to incorrect window id', () => {
    const badTabId: string = 'notExistingTabId';
    expect(() => BrowserUtils.switchToWindow(badTabId))
      .to.throw(Error)
      .with.property('message')
      .contains(`Failed switch to window by id: '${badTabId}'`);
  });
});
