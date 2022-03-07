import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

const TEST_FIELD_SELECTOR: string = "//*[@id='AcceptAlert']";
const TRIGGER_ALERT_BUTTON_SELECTOR: string = `${TEST_FIELD_SELECTOR}//button[@id='trigger-alert']`;

describeCommon('acceptAlert', () => {
  it.only('accept existing alert', async () => {
    Reporter.step(`Click on trigger alert button`);
    await $(TRIGGER_ALERT_BUTTON_SELECTOR).click();

    Reporter.step('Accept Alert');
    await BrowserUtils.acceptAlert();
  });

  it('no alert', async () => {
    Reporter.step('Validate failure to accept not existing alert');
    await chai.expect(await BrowserUtils.acceptAlert()).to.rejectedWith(Error, 'no such alert: no such alert');
  });
});
