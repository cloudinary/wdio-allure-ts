import { assert, expect } from 'chai';
import { BrowserUtils } from '../..';
import { describeCommon } from '../TestHelper';

const TEST_FIELD_SELECTOR: string = "//*[@id='ScrollToElement']";

const LIST_SELECTOR: string = `${TEST_FIELD_SELECTOR}//*[@id='scroll-content']//*[@id='div-item']`;

describeCommon('scrollToElement', () => {
  it('scroll to element with lazy load', () => {
    const elementToScrollSelector: string = `${TEST_FIELD_SELECTOR}//*[@id='div-item' and text()='my awesome new div 4']`;
    assert.isFalse($(elementToScrollSelector).isDisplayed());
    BrowserUtils.scrollToElement(elementToScrollSelector, LIST_SELECTOR);
    assert.isTrue($(elementToScrollSelector).isDisplayed());
  });

  it('scroll to already loaded element', () => {
    const elementToScrollSelector: string = `${TEST_FIELD_SELECTOR}//*[@id='div-item' and text()='my awesome new div 1']`;
    assert.isTrue($(elementToScrollSelector).isDisplayed());
    BrowserUtils.scrollToElement(elementToScrollSelector, LIST_SELECTOR);
  });

  it('fail to scroll', () => {
    const elementToScrollSelector: string = `${TEST_FIELD_SELECTOR}//*[@id='div-item' and text()='my awesome new div 100']`;
    assert.isFalse($(elementToScrollSelector).isDisplayed());
    expect(() => BrowserUtils.scrollToElement(elementToScrollSelector, LIST_SELECTOR))
      .to.throw(Error)
      .with.property('message')
      .contains('Failed to scroll to');
  });
});
