import { expect } from 'chai';
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

const TEST_FIELD_SELECTOR: string = "//*[@id='DismissAlert']";
const TRIGGER_ALERT_BUTTON_SELECTOR: string = `${TEST_FIELD_SELECTOR}//button[@id='DismissAlertTriggerAlert']`;

describeCommon('dismissAlert', () => {
  it.skip('dismiss existing alert', () => {
    Reporter.step('Click button to trigger alert');
    $(TRIGGER_ALERT_BUTTON_SELECTOR).click();

    Reporter.step('Dismiss alert');
    BrowserUtils.dismissAlert();
  });

  it.skip('no alert', () => {
    Reporter.step('Dismiss not existing alert');
    expect(() => BrowserUtils.dismissAlert())
      .to.throw(Error)
      .with.property('message')
      .contains('Failed to dismiss alert');
  });
});
