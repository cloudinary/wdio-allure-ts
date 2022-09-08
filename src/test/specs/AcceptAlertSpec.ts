import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

const TEST_FIELD_SELECTOR: string = "//*[@id='AcceptAlert']";
const TRIGGER_ALERT_BUTTON_SELECTOR: string = `${TEST_FIELD_SELECTOR}//button[@id='trigger-alert']`;

describeCommon('acceptAlert', () => {
  it('accept existing alert', async () => {
    await Reporter.step(`Click on trigger alert button`);
    await (await $(TRIGGER_ALERT_BUTTON_SELECTOR)).click();

    await Reporter.step('Accept Alert');
    await Reporter.step('Accept Alert');
    await BrowserUtils.acceptAlert();
  });

  it('no alert', async () => {
    await Reporter.step('Validate failure to accept not existing alert');
    await chai.expect(BrowserUtils.acceptAlert()).to.rejectedWith(Error, 'Failed to accept alert');
  });
});
