import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

const TEST_FIELD_SELECTOR: string = "//*[@id='ExpectAlertText']";
const TRIGGER_ALERT_BUTTON_SELECTOR: string = `${TEST_FIELD_SELECTOR}//button[@id='ExpectAlertTextTriggerAlert']`;

describeCommon('waitForAlertText', () => {
  beforeEach(async () => {
    await Reporter.step('Refresh browser');
    await browser.refresh();
  });
  it('correct text', async () => {
    await Reporter.step('Click to trigger alert');
    await $(TRIGGER_ALERT_BUTTON_SELECTOR).click();

    await Reporter.step('Validate alert text');
    await BrowserUtils.waitForAlertText('Hello! I am an alert box!');
  });
  it('incorrect text', async () => {
    await Reporter.step('Click to trigger alert');
    await $(TRIGGER_ALERT_BUTTON_SELECTOR).click();

    await Reporter.step('incorrect alert text throws an error');
    await chai
      .expect(BrowserUtils.waitForAlertText('Hello! I am not alert box!'))
      .to.rejectedWith(Error, "Incorrect alert's text or alert not found.");
  });

  it('no alert', async () => {
    await chai
      .expect(BrowserUtils.waitForAlertText('Hello! I am an alert box!'))
      .to.rejectedWith(Error, "Incorrect alert's text or alert not found.");
  });
  afterEach(async () => {
    try {
      await browser.dismissAlert();
    } catch {
      console.log('no alert opened');
    } // some test does not open alert
  });
});
