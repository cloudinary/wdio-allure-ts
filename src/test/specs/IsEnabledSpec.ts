import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import { BrowserUtils, Reporter } from '../..';
import { TestUtils } from '../..';
import { describeCommon } from '../TestHelper';

const ENABLED_INPUT_SELECTOR: string = "//*[@id='IsEnabled']//input[@id='enabled_input']";
const DISABLED_INPUT_SELECTOR: string = "//*[@id='IsEnabled']//input[@id='disabled_input']";
describeCommon('isEnabled', () => {
  it('check enabled element', async () => {
    await Reporter.step('isEnabled of enabled element');
    chai.assert.isTrue(await BrowserUtils.isEnabled(ENABLED_INPUT_SELECTOR));
  });

  it('check disabled element', async () => {
    await Reporter.step('isEnabled of disabled element');
    chai.assert.isFalse(await BrowserUtils.isEnabled(DISABLED_INPUT_SELECTOR));
  });
  it('check not existing element', async () => {
    await Reporter.step('isEnabled of not existing element');
    await chai
      .expect(BrowserUtils.isEnabled(`//*[@id='${TestUtils.randomString(5)}']`))
      .to.rejectedWith(Error, "element wasn't found");
  });
});
