import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

const INPUT_TEXT_SELECTOR: string = "//*[@id='clearValue']//input[@id='clearValue-input_text']";
const TEXT_AREA_SELECTOR: string = "//*[@id='clearValue']//textarea[@id='clearValue-textarea']";
const DISABLED_INPUT_SELECTOR: string = "//*[@id='AddValue-disabled_input']";

describeCommon('clearValue', () => {
  it('clear value of text', async () => {
    await Reporter.step('Clear input element value');
    await BrowserUtils.clearValue(INPUT_TEXT_SELECTOR);

    await Reporter.step('Validate input is empty');
    await chai.expect(await $(INPUT_TEXT_SELECTOR).getValue()).to.be.eq('');
  });

  it('clear value of text area', async () => {
    await Reporter.step('Validate text area value');
    await BrowserUtils.clearValue(TEXT_AREA_SELECTOR);

    await Reporter.step('Validate text area is empty');
    await chai.expect(await $(TEXT_AREA_SELECTOR).getValue()).to.be.eq('');
  });

  it('clear value of disable input selector', async () => {
    await Reporter.step('Clear value of disabled element');
    await chai
      .expect(BrowserUtils.clearValue(DISABLED_INPUT_SELECTOR))
      .to.rejectedWith(Error, 'Failed to clear value in');
  });
});
