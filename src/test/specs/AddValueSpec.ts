import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import { BrowserUtils, Reporter } from '../..';
import { TestUtils } from '../..';
import { describeCommon } from '../TestHelper';

const EMPTY_INPUT_SELECTOR: string = "//*[@id='AddValue']//input[@id='empty_input']";
const NOT_EMPTY_INPUT_SELECTOR: string = "//*[@id='AddValue']//input[@id='not_empty_input']";
const DISABLED_INPUT_SELECTOR: string = "//*[@id='AddValue-disabled_input']";
describeCommon('addValue', () => {
  it('add value to empty input', async () => {
    const randomText: string = TestUtils.randomString(5);

    await Reporter.step('Add value to empty input');
    await BrowserUtils.addValue(EMPTY_INPUT_SELECTOR, randomText);

    await Reporter.step(`Validate value is ${randomText}`);
    chai.expect(await (await $(EMPTY_INPUT_SELECTOR)).getValue()).to.be.eq(randomText);
  });
  it('add value to existing input', async () => {
    const randomText: string = TestUtils.randomString(5);

    await Reporter.step(`Add value to not empty input`);
    await BrowserUtils.addValue(NOT_EMPTY_INPUT_SELECTOR, randomText);

    await Reporter.step(`Validate value is Cloudinary${randomText}`);
    chai.expect(await (await $(NOT_EMPTY_INPUT_SELECTOR)).getValue()).to.be.eq(`Cloudinary${randomText}`);
  });
  it('add value to disabled input', async () => {
    await Reporter.step('Add value to disable input should throw an error');
    await chai
      .expect(BrowserUtils.addValue(DISABLED_INPUT_SELECTOR, TestUtils.randomString(5)))
      .to.rejectedWith(Error, 'still not enabled');
  });
  it('add value to not existing input', async () => {
    await Reporter.step('Add value to not existing input should throw an error');
    await chai
      .expect(BrowserUtils.addValue(`//input[@id='${TestUtils.randomString(5)}']`, TestUtils.randomString(5)))
      .to.rejectedWith(Error);
  });
});
