import { expect } from 'chai';
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

const ENABLED_ELEMENT_SELECTOR: string = "//button[@id='click_to_enable_second_button']";
const DISABLED_ELEMENT_SELECTOR: string = "//button[@id='disabled_button']";
const NOT_EXISTS_ELEMENT_SELECTOR: string = "//button[@id='disabled_button1234']";
describeCommon('waitForEnabled', () => {
  it('element enabled', () => {
    Reporter.step('click an element');
    BrowserUtils.click(ENABLED_ELEMENT_SELECTOR);

    Reporter.step('Wait for enabled');
    expect(() => BrowserUtils.waitForEnabled(ENABLED_ELEMENT_SELECTOR)).to.not.throw(Error);
  });
  it('element disabled', () => {
    Reporter.step('disabled element throws an error');
    expect(() => BrowserUtils.waitForEnabled(DISABLED_ELEMENT_SELECTOR))
      .to.throw(Error)
      .with.property('message')
      .contains(`Element not enabled`);
  });
  it('element not exists', () => {
    Reporter.step('not existing element throws an error');
    expect(() => BrowserUtils.waitForEnabled(NOT_EXISTS_ELEMENT_SELECTOR)).to.throw(Error);
  });
});
