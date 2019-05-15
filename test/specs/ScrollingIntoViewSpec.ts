import { assert } from 'chai';
import { BrowserUtils } from '../../src/commons/BrowserUtils';
import { describeCommon } from '../TestHelper';

const HEADER: string = "//*[@id='top']/header/h1";
const LAST_TOP_LINK: string = "//*[@id='scrollingIntoView']//*[@id='scrollToElementId']";

/**
 * wdio-allure-ts Scrolling Into View test
 */
describeCommon('ScrollingIntoViewSpec', () => {
    it('scrollIntoView to element outside of viewport', () => {
        BrowserUtils.waitForDisplayed(HEADER);
        assert.isFalse($(LAST_TOP_LINK).isDisplayedInViewport());
        BrowserUtils.scrollIntoView(LAST_TOP_LINK);
        assert.isTrue($(LAST_TOP_LINK).isDisplayedInViewport());
    });

    it('scrollIntoView to element in viewport', () => {
        BrowserUtils.waitForDisplayed(HEADER);
        BrowserUtils.scrollIntoView(HEADER);
        assert.isTrue($(HEADER).isDisplayedInViewport());
    });
});
