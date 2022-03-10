import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

const SELECTOR_WITH_ATTRIBUTE: string = '//button[@id="button_with_attribute_value"]';
const INCORRECT_SELECTOR: string = '//button[@id="button_with_attribute_value`-incorrect"]';
const ATTRIBUTE_NAME: string = 'value';
const INCORRECT_ATTRIBUTE_NAME: string = 'text';
const CORRECT_ATTRIBUTE_VALUE: string = 'hello world';
const INCORRECT_ATTRIBUTE_VALUE: string = 'hello hello world';

/**
 * wdio-allure-ts waitForAttributeValueSpec
 */
describeCommon('waitForAttributeValue', () => {
  it('correct value', async () => {
    await Reporter.step('Wait for attribute value');
    await BrowserUtils.waitForAttributeValue(SELECTOR_WITH_ATTRIBUTE, ATTRIBUTE_NAME, CORRECT_ATTRIBUTE_VALUE);
  });

  it('incorrect value', async () => {
    await Reporter.step('Wait for Incorrect attribute value throws an error');
    await chai
      .expect(BrowserUtils.waitForAttributeValue(SELECTOR_WITH_ATTRIBUTE, ATTRIBUTE_NAME, INCORRECT_ATTRIBUTE_VALUE))
      .to.rejectedWith(Error, `Incorrect attribute`);
  });
  it('incorrect selector', async () => {
    await Reporter.step('Wait for attribute value with incorrect selector throws an error');
    await chai
      .expect(BrowserUtils.waitForAttributeValue(INCORRECT_SELECTOR, ATTRIBUTE_NAME, INCORRECT_ATTRIBUTE_VALUE))
      .to.rejectedWith(Error, `Incorrect attribute`);
  });
  it('incorrect attribute', async () => {
    await Reporter.step('Wait for value of incorrect attribute throws an error');
    await chai
      .expect(
        BrowserUtils.waitForAttributeValue(INCORRECT_SELECTOR, INCORRECT_ATTRIBUTE_NAME, INCORRECT_ATTRIBUTE_VALUE)
      )
      .to.rejectedWith(Error, `Incorrect attribute`);
  });
});
