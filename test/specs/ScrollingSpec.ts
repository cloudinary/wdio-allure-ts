import { assert, expect } from 'chai';
import { BrowserUtils } from '../../src/commons/BrowserUtils';
import { describeCommon } from '../TestHelper';

export namespace PageLocator {
  export const HEADER: string = "//*[@id='top']/header/h1";
  export const LAST_TOP_LINK: string = "//*[@id='lastTop']";
  export const SELECTION_LIST: string = "//*[@id='selectList']";
  export const LIST_ITEM_THREE: string = `${SELECTION_LIST}/optgroup/option[3]`;
}

/**
 * wdio-allure-ts Scrolling action test
 */
describeCommon('Scroll', () => {
  it('scrollIntoView ', () => {
    BrowserUtils.waitForDisplayed(PageLocator.HEADER);
    assert.isFalse($(PageLocator.LAST_TOP_LINK).isDisplayedInViewport());
    BrowserUtils.scrollIntoView(PageLocator.LAST_TOP_LINK);
    assert.isTrue($(PageLocator.LAST_TOP_LINK).isDisplayedInViewport());
  });

  it('scrollToElement', () => {
    expect(() =>
      BrowserUtils.scrollToElement(
        PageLocator.LIST_ITEM_THREE,
        PageLocator.SELECTION_LIST
      )
    ).not.to.throw(Error);
  });
});
