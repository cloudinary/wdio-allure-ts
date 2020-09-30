import { assert, expect } from 'chai';
import { BrowserUtils } from '../..';
import { describeCommon, sampleAppUrl } from '../TestHelper';

const OPEN_TAB_BUTTON: string = "//button[@data-test='open-tab-btn']";
/**
 * wdio-allure-ts tab actions test
 */
describeCommon('tab actions', () => {
  it('get tab ids', () => {
    let tabIds: string[] = BrowserUtils.getTabIds();
    assert.equal(tabIds.length, 1, 'Incorrect number of tab ids');
    BrowserUtils.click(OPEN_TAB_BUTTON);

    tabIds = BrowserUtils.getTabIds();
    assert.equal(tabIds.length, 2, 'Incorrect number of tab ids');
  });

  it('switch to tab', () => {
    BrowserUtils.navigateToUrl(sampleAppUrl);
    BrowserUtils.click(OPEN_TAB_BUTTON);
    const tabIds: string[] = BrowserUtils.getTabIds();

    BrowserUtils.switchTab(tabIds[1]);

    assert.equal(tabIds[1], browser.getWindowHandle(), 'Failed to switch tabs');
  });

  it('switch to incorrect tab id', () => {
    const badTabId: string = 'notExistingTabId';
    expect(() => BrowserUtils.switchTab(badTabId))
      .to.throw(Error)
      .with.property('message')
      .contains(`Failed switch to tab by id: '${badTabId}'`);
  });
});
