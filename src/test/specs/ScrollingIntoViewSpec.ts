import { assert } from 'chai';
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

const HEADER: string = "//*[@id='top']/header/h1";
const LAST_TOP_LINK: string = "//*[@id='scrollingIntoView']//*[@id='scrollToElementId']";

/**
 * wdio-allure-ts Scrolling Into View test
 */
describeCommon('ScrollingIntoViewSpec', () => {
  it('scrollIntoView to element outside of viewport', async () => {
    await Reporter.step('wait for page to load');
    await BrowserUtils.waitForDisplayed(HEADER);

    await Reporter.step('validate element not in view port');
    assert.isFalse(await (await $(LAST_TOP_LINK)).isDisplayedInViewport());

    await Reporter.step('scroll into view');
    await BrowserUtils.scrollIntoView(LAST_TOP_LINK);

    await Reporter.step('validate element is in view port');
    assert.isTrue(await (await $(LAST_TOP_LINK)).isDisplayedInViewport());
  });

  it('scrollIntoView to element in viewport', async () => {
    await Reporter.step('Validate element displayed');
    await BrowserUtils.waitForDisplayed(HEADER);

    await Reporter.step('scroll into view');
    await BrowserUtils.scrollIntoView(HEADER);

    await Reporter.step('validate element in view port');
    assert.isTrue(await (await $(HEADER)).isDisplayedInViewport());
  });
});
