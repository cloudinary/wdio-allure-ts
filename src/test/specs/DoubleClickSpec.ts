import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

/**
 * doubleClick
 */
describeCommon('doubleClick', () => {
  it('successful double click', async () => {
    await Reporter.step('Double click on button');
    await BrowserUtils.doubleClick("//button[@id='doubleClickToEnable']");

    await Reporter.step('Validate double click worked');
    await BrowserUtils.waitForEnabled("//button[@id='doubleClickWillBeEnabledButton']");
  });

  it('double click not existing element', async () => {
    const notExistingElementSelector: string = '//notARealSelector';
    await Reporter.step('Double click not existing element');
    await chai
      .expect(BrowserUtils.doubleClick(notExistingElementSelector))
      .to.rejectedWith(Error, ` element ("${notExistingElementSelector}") still not displayed`);
  });

  it('double click hidden element', async () => {
    const hiddenElementSelector: string = "//button[@id='doubleClickHidden']";
    await Reporter.step('Double click hidden element');
    await chai
      .expect(BrowserUtils.doubleClick(hiddenElementSelector))
      .to.rejectedWith(Error, `Element not visible '${hiddenElementSelector}'`);
  });

  it('double click disabled element', async () => {
    const disableElementSelector: string = "//button[@id='doubleClickDisabledButton']";
    await Reporter.step('Double click disabled element');
    await chai
      .expect(BrowserUtils.doubleClick(disableElementSelector))
      .to.rejectedWith(Error, `Element not enabled '${disableElementSelector}'`);
  });
});
