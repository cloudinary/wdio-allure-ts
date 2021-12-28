import { assert, expect } from 'chai';
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

const TEST_FIELD_SELECTOR: string = "//*[@id='ScrollToElement']";

const LIST_SELECTOR: string = `${TEST_FIELD_SELECTOR}//*[@id='scroll-content']//*[@id='div-item']`;

describeCommon('scrollTo', () => {
  it('scroll to element with lazy load', () => {
    const elementToScrollSelector: string = `${TEST_FIELD_SELECTOR}//*[@id='div-item' and text()='my awesome new div 4']`;
    Reporter.step('validate element not displayed');
    assert.isFalse($(elementToScrollSelector).isDisplayed());

    Reporter.step('scroll to element');
    BrowserUtils.scrollToItemInList(elementToScrollSelector, LIST_SELECTOR);

    Reporter.step('validate element is displayed');
    assert.isTrue($(elementToScrollSelector).isDisplayed());
  });

  it('scroll to already loaded element', () => {
    const elementToScrollSelector: string = `${TEST_FIELD_SELECTOR}//*[@id='div-item' and text()='my awesome new div 1']`;
    Reporter.step('validate element is displayed');
    assert.isTrue($(elementToScrollSelector).isDisplayed());
    Reporter.step('scroll to element');
    BrowserUtils.scrollToItemInList(elementToScrollSelector, LIST_SELECTOR);
  });

  it('fail to scroll', () => {
    const elementToScrollSelector: string = `${TEST_FIELD_SELECTOR}//*[@id='div-item' and text()='my awesome new div 100']`;
    Reporter.step('validate element not displayed');
    assert.isFalse($(elementToScrollSelector).isDisplayed());

    Reporter.step('scroll to not existing element throws an error');
    expect(() => BrowserUtils.scrollToItemInList(elementToScrollSelector, LIST_SELECTOR))
      .to.throw(Error)
      .with.property('message')
      .contains('Failed to scroll to');
  });
});
