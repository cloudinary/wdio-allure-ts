import { assert } from 'chai';
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

const HEADER: string = "//*[@id='top']/header/h1";
const LAST_TOP_LINK: string = "//*[@id='scrollingIntoView']//*[@id='scrollToElementId']";

/**
 * wdio-allure-ts Scrolling Into View test
 */
describeCommon('ScrollingIntoViewSpec', () => {
  it('scrollIntoView to element outside of viewport', () => {
    Reporter.step('wait for page to load');
    BrowserUtils.waitForDisplayed(HEADER);

    Reporter.step('validate element not in view port');
    assert.isFalse($(LAST_TOP_LINK).isDisplayedInViewport());

    Reporter.step('scroll into view');
    BrowserUtils.scrollIntoView(LAST_TOP_LINK);

    Reporter.step('validate element is in view port');
    assert.isTrue($(LAST_TOP_LINK).isDisplayedInViewport());
  });

  it('scrollIntoView to element in viewport', () => {
    Reporter.step('Validate element displayed');
    BrowserUtils.waitForDisplayed(HEADER);
    Reporter.step('scroll into view');
    BrowserUtils.scrollIntoView(HEADER);
    Reporter.step('validate element in view port');
    assert.isTrue($(HEADER).isDisplayedInViewport());
  });
});
