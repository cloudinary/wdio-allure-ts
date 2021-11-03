import { expect } from 'chai';
import { BrowserUtils } from '../..';
import { describeCommon } from '../TestHelper';

/**
 * waitForExist reverse:true
 */
describeCommon('waitForExist reverse:true', () => {
  it('disappearing element', () => {
    const DISAPPEARING_BUTTON_SELECTOR: string = "//button[@id='not-existing-button']";
    BrowserUtils.click(DISAPPEARING_BUTTON_SELECTOR);
    expect(() => BrowserUtils.waitForExist(DISAPPEARING_BUTTON_SELECTOR, { reverse: true })).to.not.throw(Error);
  });
  it('fail on existing element', () => {
    const EXISTING_BUTTON_SELECTOR: string = "//button[@id='existing-button']";
    expect(() => BrowserUtils.waitForExist(EXISTING_BUTTON_SELECTOR, { reverse: true }))
      .to.throw(Error)
      .with.property('message')
      .contains('still existing');
  });
});
