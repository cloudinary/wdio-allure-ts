import { expect } from 'chai';
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

const TEST_FIELD_SELECTOR: string = "//*[@id='ExpectAlertText']";
const TRIGGER_ALERT_BUTTON_SELECTOR: string = `${TEST_FIELD_SELECTOR}//button[@id='ExpectAlertTextTriggerAlert']`;

describeCommon('waitForAlertText', () => {
  beforeEach(() => {
    Reporter.step('Refresh browser');
    browser.refresh();
  });
  it.skip('correct text', () => {
    Reporter.step('Click to trigger alert');
    $(TRIGGER_ALERT_BUTTON_SELECTOR).click();

    Reporter.step('Validate alert text');
    expect(() => BrowserUtils.waitForAlertText('Hello! I am an alert box!')).to.not.throw();
  });
  it.skip('incorrect text', () => {
    Reporter.step('Click to trigger alert');
    $(TRIGGER_ALERT_BUTTON_SELECTOR).click();

    Reporter.step('incorrect alert text throws an error');
    expect(() => BrowserUtils.waitForAlertText('Hello! I am not alert box!'))
      .to.throw(Error)
      .with.property('message')
      .contains("Incorrect alert's text or alert not found.");
  });

  it.skip('no alert', () => {
    expect(() => BrowserUtils.waitForAlertText('Hello! I am an alert box!'))
      .to.throw(Error)
      .with.property('message')
      .contains("Incorrect alert's text or alert not found.");
  });
  afterEach(() => {
    try {
      browser.dismissAlert();
    } catch {
      console.log('no alert opened');
    } // some test does not open alert
  });
});
