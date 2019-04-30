import waitForEnabled = BrowserUtils.waitForEnabled;
import { expect } from 'chai';
import { BrowserUtils } from '../../src/commons/BrowserUtils';
import { describeCommon } from '../TestHelper';

const ENABLED_ELEMENT_SELECTOR: string = "//input[@id='enabled_input']";
const DISABLED_ELEMENT_SELECTOR: string = "//input[@id='disabled_input']";
const NOT_EXISTS_ELEMENT_SELECTOR: string = "//input[@id='non_exists_input']";
describeCommon('waitForEnabled', () => {
  it('element enabled', () => {
    expect(() => waitForEnabled(ENABLED_ELEMENT_SELECTOR)).to.not.throw(Error);
  });
  it('element disabled', () => {
    expect(() => waitForEnabled(ENABLED_ELEMENT_SELECTOR))
      .to.not.throw(Error)
      .with.property('message')
      .equal(`The selector  ${DISABLED_ELEMENT_SELECTOR} is not enabled `);
  });
  it('element not exists', () => {
    expect(() => waitForEnabled(ENABLED_ELEMENT_SELECTOR))
      .to.not.throw(Error)
      .with.property('message')
      .equal(`The selector  ${NOT_EXISTS_ELEMENT_SELECTOR} is not enabled `);
  });
});
