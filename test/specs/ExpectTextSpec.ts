import { expect } from 'chai';
import { BrowserUtils } from '../../src/commons/BrowserUtils';
import { describeCommon } from '../TestHelper';

const DIV_DOUBLE_CLICK: string = "//*[@id='div-double-click-txt']";

/**
 * wdio-allure-ts expectedText tests
 */
describeCommon('expectText', () => {
  it.skip('Validate expectedText Change ', () => {
    BrowserUtils.scrollIntoView(DIV_DOUBLE_CLICK);
    BrowserUtils.expectText(DIV_DOUBLE_CLICK, 'Double click');
    BrowserUtils.doubleClick(DIV_DOUBLE_CLICK);
    BrowserUtils.expectText(DIV_DOUBLE_CLICK, 'Double Click Event');
  });

  it.skip('Validate expectedText fail on case sensitive ', () => {
    BrowserUtils.scrollIntoView(DIV_DOUBLE_CLICK);
    BrowserUtils.doubleClick(DIV_DOUBLE_CLICK);

    expect(() =>
      BrowserUtils.expectText(DIV_DOUBLE_CLICK, 'double click event')
    )
      .to.throw(Error)
      .with.property('message')
      .contains('waitUntil condition timed out');
  });

  it.skip('Validate expectedText fail on spaces ', () => {
    BrowserUtils.scrollIntoView(DIV_DOUBLE_CLICK);
    BrowserUtils.doubleClick(DIV_DOUBLE_CLICK);

    expect(() =>
      BrowserUtils.expectText(DIV_DOUBLE_CLICK, 'Double     Click     Event')
    )
      .to.throw(Error)
      .with.property('message')
      .contains('waitUntil condition timed out');
  });

  it.skip('Validate expectedText fail on wrong text ', () => {
    BrowserUtils.scrollIntoView(DIV_DOUBLE_CLICK);
    BrowserUtils.doubleClick(DIV_DOUBLE_CLICK);

    expect(() => BrowserUtils.expectText(DIV_DOUBLE_CLICK, 'wrong text'))
      .to.throw(Error)
      .with.property('message')
      .contains('waitUntil condition timed out');
  });
});
