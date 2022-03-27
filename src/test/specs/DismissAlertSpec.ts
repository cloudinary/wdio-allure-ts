import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

const TEST_FIELD_SELECTOR: string = "//*[@id='DismissAlert']";
const TRIGGER_ALERT_BUTTON_SELECTOR: string = `${TEST_FIELD_SELECTOR}//button[@id='DismissAlertTriggerAlert']`;

describeCommon('dismissAlert', () => {
  it('dismiss existing alert', async () => {
    await Reporter.step('Click button to trigger alert');
    await (await $(TRIGGER_ALERT_BUTTON_SELECTOR)).click();

    await Reporter.step('Dismiss alert');
    await BrowserUtils.dismissAlert();
  });

  it('no alert', async () => {
    await Reporter.step('Dismiss not existing alert');
    await chai.expect(BrowserUtils.dismissAlert()).to.rejectedWith(Error, 'Failed to dismiss alert');
  });
});
