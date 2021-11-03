import { expect } from 'chai';
import { BrowserUtils } from '../..';
import { describeCommon } from '../TestHelper';

const VISIBLE_ELEMENT_SELECTOR: string = "//*[@data-test='visible-btn']";
const NOT_VISIBLE_ELEMENT_SELECTOR: string = "//*[@data-test='not-visible-btn']";
const NOT_EXIST_ELEMENT_SELECTOR: string = "//*[@data-test='no-such-element']";
const DISAPPEARING_ELEMENT_SELECTOR: string = "//*[@data-test='disappearing-btn']";
/**
 * wdio-allure-ts waitForDisplayed - reverse - true action test
 */
describeCommon('waitForDisplayed - reverse: true', () => {
  it('displayed element', () => {
    expect(() => BrowserUtils.waitForDisplayed(VISIBLE_ELEMENT_SELECTOR, { reverse: true }))
      .to.throw(Error)
      .with.property('message')
      .contains(' still displayed ');
  });

  it('notDisplayed but exist element ', () => {
    expect(() => BrowserUtils.waitForDisplayed(NOT_VISIBLE_ELEMENT_SELECTOR, { reverse: true })).to.not.throw(Error);
  });

  it('not exist element ', () => {
    expect(() => BrowserUtils.waitForDisplayed(NOT_EXIST_ELEMENT_SELECTOR, { reverse: true })).to.not.throw(Error);
  });

  it('disappearing element', () => {
    expect(() => BrowserUtils.waitForDisplayed(DISAPPEARING_ELEMENT_SELECTOR)).to.not.throw(Error);
    $(DISAPPEARING_ELEMENT_SELECTOR).click();

    expect(() => BrowserUtils.waitForDisplayed(DISAPPEARING_ELEMENT_SELECTOR, { reverse: true })).to.not.throw(Error);
  });
});
