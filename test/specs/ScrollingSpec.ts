import { assert } from 'chai';
import { BrowserUtils } from '../../src/commons/BrowserUtils';
import { describeCommon } from '../TestHelper';

export namespace PageLocator {
  export const HEADER: string = "//*[@id='top']/header/h1";
  export const CAT_IMAGE: string = "//*[@id='embedded__images']/div/p/img";
  export const SELECTION_LIST: string = "//*[@id='select']";
  export const LIST_ITEM_THREE: string = "//*[@id='select']/optgroup/option[3]";
}

/**
 * wdio-allure-ts Scrolling action test
 */
describeCommon('Scroll', () => {
  it('scrollIntoView ', () => {
    BrowserUtils.isVisible(PageLocator.HEADER);
    assert.isFalse($(PageLocator.CAT_IMAGE).isDisplayedInViewport());
    BrowserUtils.scrollIntoView(PageLocator.CAT_IMAGE);
    assert.isTrue($(PageLocator.CAT_IMAGE).isDisplayedInViewport());
  });

  it.skip('scrollToElement', () => {
    BrowserUtils.scrollToElement(
      PageLocator.LIST_ITEM_THREE,
      PageLocator.SELECTION_LIST
    );
    browser.debug();
  });
});
