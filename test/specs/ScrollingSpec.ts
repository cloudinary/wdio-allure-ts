import { assert } from 'chai';
import { BrowserUtils } from '../../src/commons/BrowserUtils';
import { describeCommon } from '../TestHelper';

export namespace PageLocator {
  export const HEADER: string = "//*[@id='header']";
  export const CAT_IMAGE: string = "//*[@id='embedded__images']/div/p/img";
}

/**
 * wdio-allure-ts Scrolling action test
 */
describeCommon('Scroll', () => {
  it('scrollIntoView ', () => {
    BrowserUtils.waitForDisplayed(PageLocator.HEADER);
    assert.isFalse($(PageLocator.CAT_IMAGE).isDisplayedInViewport());
    BrowserUtils.scrollIntoView(PageLocator.CAT_IMAGE);
    assert.isTrue($(PageLocator.CAT_IMAGE).isDisplayedInViewport());
  });
});
