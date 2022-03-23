import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

const TEST_FIELD_SELECTOR: string = "//*[@id='ScrollToElement']";

const LIST_SELECTOR: string = `${TEST_FIELD_SELECTOR}//*[@id='scroll-content']//*[@id='div-item']`;

describeCommon('scrollTo', () => {
  it('scroll to element with lazy load', async () => {
    const elementToScrollSelector: string = `${TEST_FIELD_SELECTOR}//*[@id='div-item' and text()='my awesome new div 4']`;
    await Reporter.step('validate element not displayed');
    chai.assert.isFalse(await (await $(elementToScrollSelector)).isDisplayed());

    await Reporter.step('scroll to element');
    await BrowserUtils.scrollToItemInList(elementToScrollSelector, LIST_SELECTOR);

    await Reporter.step('validate element is displayed');
    chai.assert.isTrue(await (await $(elementToScrollSelector)).isDisplayed());
  });

  it('scroll to already loaded element', async () => {
    const elementToScrollSelector: string = `${TEST_FIELD_SELECTOR}//*[@id='div-item' and text()='my awesome new div 1']`;
    await Reporter.step('validate element is displayed');
    chai.assert.isTrue(await (await $(elementToScrollSelector)).isDisplayed());

    await Reporter.step('scroll to element');
    await BrowserUtils.scrollToItemInList(elementToScrollSelector, LIST_SELECTOR);
  });

  it('fail to scroll', async () => {
    const elementToScrollSelector: string = `${TEST_FIELD_SELECTOR}//*[@id='div-item' and text()='my awesome new div 100']`;

    await Reporter.step('validate element not displayed');
    chai.assert.isFalse(await (await $(elementToScrollSelector)).isDisplayed());

    await Reporter.step('scroll to not existing element throws an error');
    await chai
      .expect(BrowserUtils.scrollToItemInList(elementToScrollSelector, LIST_SELECTOR))
      .to.rejectedWith(Error, 'Failed to scroll to');
  });
});
