import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import { BrowserUtils, Reporter } from '../..';
import { describeCommon, sampleAppUrl } from '../TestHelper';

const EMPTY_DIV: string = '//*[@id="formsWithoutAttribute"]//*[@id="noAttDiv"]';
/**
 * wdio-allure-ts ExpectNoAttributeValueSpec action test
 */
describeCommon('expectNoAttributeValue', () => {
  it("Doesn't contains value", async () => {
    await Reporter.step('Validate attribute does not contain value');
    await BrowserUtils.waitForAttributeValue(EMPTY_DIV, 'data-test', 'expectNoAttributeValueCent', true);
  });

  it('Contains word substring', async () => {
    await Reporter.step('Validate attribute does not contain substring of a value');
    await BrowserUtils.waitForAttributeValue(EMPTY_DIV, 'data-test', 'expectNoAttributeValueCenterrr', true);
  });

  it('Exact match error thrown', async () => {
    await Reporter.step('Attribute contain value throws error');
    await chai
      .expect(BrowserUtils.waitForAttributeValue(EMPTY_DIV, 'data-test', 'expectNoAttributeValueCenter', true))
      .to.rejectedWith(Error, 'Incorrect attribute');
  });

  it('Element not exists', async () => {
    await Reporter.step('Navigate to sample app');
    await BrowserUtils.url(sampleAppUrl);

    await Reporter.step('attribute value of not existing element throws an error');
    await chai.expect(BrowserUtils.waitForAttributeValue('//NotExist', 'method', 'post', true)).to.rejectedWith(Error);
  });

  it('Attribute not exists', async () => {
    await Reporter.step('Navigate to sample app');
    await BrowserUtils.url(sampleAppUrl);
    await Reporter.step('attribute value of not existing attribute throws an error');
    await chai
      .expect(BrowserUtils.waitForAttributeValue(EMPTY_DIV, 'NotExist', 'post', true))
      .to.rejectedWith(Error, 'Incorrect attribute');
  });
});
