import { expect } from 'chai';
import { BrowserUtils } from '../..';
import { describeCommon } from '../TestHelper';

/**
 * notExist
 */
describeCommon('notExist', () => {
  it('disappearing element', () => {
    const DISAPPEARING_BUTTON_SELECTOR: string = "//button[@id='not-existing-button']";
    BrowserUtils.click(DISAPPEARING_BUTTON_SELECTOR);
    expect(() => BrowserUtils.notExist(DISAPPEARING_BUTTON_SELECTOR)).to.not.throw(Error);
  });
  it('fail on existing element', () => {
    const EXISTING_BUTTON_SELECTOR: string = "//button[@id='existing-button']";
    expect(() => BrowserUtils.notExist(EXISTING_BUTTON_SELECTOR))
      .to.throw(Error)
      .with.property('message')
      .contains(`Failed to validate element not exist '${EXISTING_BUTTON_SELECTOR}'`);
  });
});
