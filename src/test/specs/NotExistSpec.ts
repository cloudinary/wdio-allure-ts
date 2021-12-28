import { expect } from 'chai';
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

/**
 * waitForExist reverse:true
 */
describeCommon('waitForExist reverse:true', () => {
  it('disappearing element', () => {
    const DISAPPEARING_BUTTON_SELECTOR: string = "//button[@id='not-existing-button']";
    Reporter.step('Click on disappearing button');
    $(DISAPPEARING_BUTTON_SELECTOR).click();

    Reporter.step('Validate element does not exist');
    expect(() => BrowserUtils.waitForExist(DISAPPEARING_BUTTON_SELECTOR, { reverse: true })).to.not.throw(Error);
  });
  it('fail on existing element', () => {
    const EXISTING_BUTTON_SELECTOR: string = "//button[@id='existing-button']";
    Reporter.step('existing element throws an error');
    expect(() => BrowserUtils.waitForExist(EXISTING_BUTTON_SELECTOR, { reverse: true }))
      .to.throw(Error)
      .with.property('message')
      .contains('still existing');
  });
});
