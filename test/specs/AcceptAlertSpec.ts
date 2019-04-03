import { expect } from 'chai';
import { BrowserUtils } from '../../src/commons/BrowserUtils';
import { describeCommon } from '../TestHelper';

const TEST_FIELD_SELECTOR: string = "//*[@id='AcceptAlert']";
const TRIGGER_ALERT_BUTTON_SELECTOR: string = `${TEST_FIELD_SELECTOR}//button[@id='trigger-alert']`;

describeCommon('acceptAlert', () => {
  it('accept existing alert', () => {
    $(TRIGGER_ALERT_BUTTON_SELECTOR).click();
    BrowserUtils.acceptAlert();
  });

  it('no alert', () => {
    expect(() => BrowserUtils.acceptAlert())
      .to.throw(Error)
      .with.property('message')
      .contains('Failed to accept alert');
  });
});
