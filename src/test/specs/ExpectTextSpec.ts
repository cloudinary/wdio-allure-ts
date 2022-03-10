import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

const TEST_FIELD_SELECTOR: string = "//*[@id='ExpectText']";
const STATIC_TEXT_SELECTOR: string = `${TEST_FIELD_SELECTOR}//*[@id='static_text']`;
const DYNAMIC_TEXT_SELECTOR: string = `${TEST_FIELD_SELECTOR}//*[@id='dynamic_text']`;
const HIDDEN_TEXT_SELECTOR: string = `${TEST_FIELD_SELECTOR}//*[@id='hidden_text']`;
const CHANGE_TEXT_BUTTON_SELECTOR: string = `${TEST_FIELD_SELECTOR}//button[@id='update_text']`;
/**
 * wdio-allure-ts waitForText tests
 */
describeCommon('waitForText', () => {
  it('correct text', async () => {
    await Reporter.step('wait for correct text');
    await BrowserUtils.waitForText(STATIC_TEXT_SELECTOR, 'Cloudinary rules!');
  });

  it('hidden text', async () => {
    await Reporter.step('Wait for text of hidden element throws error');
    await chai
      .expect(BrowserUtils.waitForText(HIDDEN_TEXT_SELECTOR, 'Cloudinary rules!'))
      .to.rejectedWith(Error, 'Element not visible');
  });

  it('dynamic text', async () => {
    await Reporter.step('Wait for button to be displayed');
    await $(CHANGE_TEXT_BUTTON_SELECTOR).waitForDisplayed();

    await Reporter.step('Click button');
    await $(CHANGE_TEXT_BUTTON_SELECTOR).click();

    await Reporter.step('Wait for text change');
    await BrowserUtils.waitForText(DYNAMIC_TEXT_SELECTOR, 'Cloudinary still rules!');
  });

  it('fail on case sensitive', async () => {
    await Reporter.step('Check case sensitive text');
    await chai
      .expect(BrowserUtils.waitForText(STATIC_TEXT_SELECTOR, 'cloudinary rules!'))
      .to.rejectedWith(Error, 'waitUntil condition timed out');
  });

  it('fail on wrong text', async () => {
    await Reporter.step('wait for incorrect text throw an error');
    await chai
      .expect(BrowserUtils.waitForText(STATIC_TEXT_SELECTOR, 'Cloudinary not rules!'))
      .to.rejectedWith(Error, 'waitUntil condition timed out');
  });
});
