import { expect } from 'chai';
import { BrowserUtils } from '../../src/commons/BrowserUtils';
import { describeCommon } from '../TestHelper';

const SELECTION_LIST: string = "//*[@id='selectList']";
const LIST_ITEM_THREE: string = `${SELECTION_LIST}/optgroup/option[3]`;

/**
 * wdio-allure-ts Scrolling In list of elements test
 */
describeCommon('ScrollToElementSpec', () => {
  it('Scroll Success', () => {
    expect(() =>
      BrowserUtils.scrollToElement(LIST_ITEM_THREE, SELECTION_LIST)
    ).not.to.throw(Error);
  });
});
