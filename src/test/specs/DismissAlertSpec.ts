import { expect } from 'chai';
import { BrowserUtils } from '../../commons/BrowserUtils';
import { describeCommon } from '../TestHelper';

const TEST_FIELD_SELECTOR: string = "//*[@id='DismissAlert']";
const TRIGGER_ALERT_BUTTON_SELECTOR: string = `${TEST_FIELD_SELECTOR}//button[@id='DismissAlertTriggerAlert']`;

describeCommon('dismissAlert', () => {
  it('dismiss existing alert', () => {
    $(TRIGGER_ALERT_BUTTON_SELECTOR).click();
    BrowserUtils.dismissAlert();
  });

  it('no alert', () => {
    expect(() => BrowserUtils.dismissAlert())
      .to.throw(Error)
      .with.property('message')
      .contains('Failed to dismiss alert');
  });
});
