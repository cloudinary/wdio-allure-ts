import { expect } from 'chai';
import { BrowserUtils } from '../../src/commons/BrowserUtils';
import { describeCommon } from '../TestHelper';

const TEST_FIELD_SELECTOR: string = "//*[@id='ExpectAlertClosed']";
const TRIGGER_ALERT_BUTTON_SELECTOR: string = `${TEST_FIELD_SELECTOR}//button[@id='trigger-alert']`;
const TRIGGER_CLOSING_ALERT_BUTTON_SELECTOR: string = `${TEST_FIELD_SELECTOR}//button[@id='trigger-closing-alert']`;

describeCommon('expectAlertClosed', () => {
  beforeEach(() => {
    browser.refresh();
  });

  it('closed', () => {
    $(TRIGGER_CLOSING_ALERT_BUTTON_SELECTOR).click();
    BrowserUtils.expectAlertClosed();
  });

  it('opened', () => {
    $(TRIGGER_ALERT_BUTTON_SELECTOR).click();
    browser.waitUntil(() => browser.isAlertOpen(), 2000);
    expect(() => BrowserUtils.expectAlertClosed())
      .to.throw(Error)
      .with.property('message')
      .contains('Alert found');
  });
});
