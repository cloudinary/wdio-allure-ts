import { assert, expect } from 'chai';
import { BrowserUtils, Reporter } from '../..';
import { describeCommon, sampleAppUrl } from '../TestHelper';

const OPEN_TAB_BUTTON: string = "//button[@data-test='open-tab-btn']";
/**
 * wdio-allure-ts tab actions test
 */
describeCommon('tab actions', () => {
  it('get tab ids', () => {
    Reporter.step('get tab ids');
    let tabIds: Array<string> = BrowserUtils.getWindowHandles();

    Reporter.step('validate number of tabs');
    assert.equal(tabIds.length, 1, 'Incorrect number of tab ids');

    Reporter.step('open new tab');
    BrowserUtils.click(OPEN_TAB_BUTTON);

    Reporter.step('get tab ids');
    tabIds = BrowserUtils.getWindowHandles();

    Reporter.step('validate number of tabs');
    assert.equal(tabIds.length, 2, 'Incorrect number of tab ids');
  });

  it('switch to tab', () => {
    Reporter.step('Navigate to sample app');
    BrowserUtils.url(sampleAppUrl);

    Reporter.step('open new tab');
    BrowserUtils.click(OPEN_TAB_BUTTON);

    Reporter.step('get tabs ids');
    const tabIds: Array<string> = BrowserUtils.getWindowHandles();

    Reporter.step('switch to tab');
    BrowserUtils.switchToWindow(tabIds[1]);

    Reporter.step('Validate tab change');
    assert.equal(tabIds[1], browser.getWindowHandle(), 'Failed to switch tabs');
  });

  it('switch to incorrect window id', () => {
    const badTabId: string = 'notExistingTabId';
    Reporter.step('switch to incorrect window id throws an error');
    expect(() => BrowserUtils.switchToWindow(badTabId))
      .to.throw(Error)
      .with.property('message')
      .contains(`Failed switch to window by id: '${badTabId}'`);
  });
});
