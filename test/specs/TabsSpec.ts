import { assert, expect } from 'chai';
import { BrowserUtils } from '../../src/commons/BrowserUtils';
import { describeCommon } from '../TestHelper';

/**
 * wdio-allure-ts tab actions test
 */
describeCommon('tab actions', () => {
  it('get tab ids', () => {
    let tabIds: string[] = BrowserUtils.getTabIds();
    assert.equal(tabIds.length, 1, 'Incorrect number of tab ids');
    browser.click("//button[@data-test='open-tab-btn']");

    tabIds = BrowserUtils.getTabIds();
    assert.equal(tabIds.length, 2, 'Incorrect number of tab ids');
  });

  it('switch to tab', () => {
    browser.click("//button[@data-test='open-tab-btn']");
    const tabIds: string[] = browser.getTabIds();

    BrowserUtils.switchTab(tabIds[1]);

    assert.equal(tabIds[1], browser.getCurrentTabId(), 'Failed to switch tabs');
  });

  it('switch to incorrect tab id', () => {
    const badTabId: string = 'notExistingTabId';
    expect(() => BrowserUtils.switchTab(badTabId))
      .to.throw(Error)
      .with.property('message')
      .contains(`Failed switch to tab by id: '${badTabId}'`);
  });
});
