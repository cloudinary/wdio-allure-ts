import { expect } from 'chai';
import { BrowserUtils } from '../../src/commons/BrowserUtils';
import { describeCommon } from '../TestHelper';

const TEST_FIELD_SELECTOR: string = "//*[@id='ExpectAlertOpened']";
const TRIGGER_ALERT_BUTTON_SELECTOR: string = `${TEST_FIELD_SELECTOR}//button[@id='trigger-alert']`;

describeCommon('expectAlertOpened', () => {
  beforeEach(() => {
    browser.refresh();
  });

  it('opened', () => {
    $(TRIGGER_ALERT_BUTTON_SELECTOR).click();
    BrowserUtils.expectAlertOpened();
  });

  it('no alert', () => {
    expect(() => BrowserUtils.expectAlertOpened())
      .to.throw(Error)
      .with.property('message')
      .contains('Alert not found');
  });
  afterEach(() => {
    try {
      browser.dismissAlert();
    } catch {
      console.log('no alert opened');
    } //some test does not open alert
  });
});
