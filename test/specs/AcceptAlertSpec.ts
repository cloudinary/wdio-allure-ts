import { assert, expect } from 'chai';
import { BrowserUtils } from '../../src/commons/BrowserUtils';
import { describeCommon } from '../TestHelper';

const TEST_FIELD_SELECTOR: string = "//*[@id='AcceptAlert']";
const TRIGGER_ALERT_BUTTON_SELECTOR: string = `${TEST_FIELD_SELECTOR}//button[@id='trigger-alert']`;

describeCommon('acceptAlert', () => {
  beforeEach(() => {
    browser.refresh();
  });

  it('accept existing alert', () => {
    $(TRIGGER_ALERT_BUTTON_SELECTOR).click();
    BrowserUtils.dismissAlert();

    assert.isFalse(browser.isAlertOpen());
  });

  it('no alert', () => {
    expect(() => BrowserUtils.dismissAlert())
      .to.throw(Error)
      .with.property('message')
      .contains('Alert not found');
  });
});
