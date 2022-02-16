import { expect } from 'chai';
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

const TEST_FIELD_SELECTOR: string = "//*[@id='AcceptAlert']";
const TRIGGER_ALERT_BUTTON_SELECTOR: string = `${TEST_FIELD_SELECTOR}//button[@id='trigger-alert']`;

describeCommon('acceptAlert', () => {
  it.skip('accept existing alert', () => {
    Reporter.step(`Click on trigger alert button`);
    $(TRIGGER_ALERT_BUTTON_SELECTOR).click();

    Reporter.step('Accept Alert');
    BrowserUtils.acceptAlert();
  });

  it.skip('no alert', () => {
    Reporter.step('Validate failure to accept not existing alert');
    expect(() => BrowserUtils.acceptAlert())
      .to.throw(Error)
      .with.property('message')
      .contains('Failed to accept alert');
  });
});
