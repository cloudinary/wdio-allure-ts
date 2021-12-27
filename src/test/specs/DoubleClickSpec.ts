import { expect } from 'chai';
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

/**
 * doubleClick
 */
describeCommon('doubleClick', () => {
  it('successful double click', () => {
    Reporter.step('Double click on button');
    expect(() => BrowserUtils.doubleClick("//button[@id='doubleClickToEnable']")).to.not.throw(Error);

    Reporter.step('Validate double click worked');
    BrowserUtils.waitForEnabled("//button[@id='doubleClickWillBeEnabledButton']");
  });

  it('double click not existing element', () => {
    const notExistingElementSelector: string = '//notARealSelector';
    Reporter.step('Double click not existing element');
    expect(() => BrowserUtils.doubleClick(notExistingElementSelector))
      .to.throw(Error)
      .with.property('message')
      .contains(` element ("${notExistingElementSelector}") still not existing`);
  });

  it('double click hidden element', () => {
    const hiddenElementSelector: string = "//button[@id='doubleClickHidden']";
    Reporter.step('Double click hidden element');
    expect(() => BrowserUtils.doubleClick(hiddenElementSelector))
      .to.throw(Error)
      .with.property('message')
      .contains(`Element not visible '${hiddenElementSelector}'`);
  });

  it('double click disabled element', () => {
    const disableElementSelector: string = "//button[@id='doubleClickDisabledButton']";
    Reporter.step('Double click disabled element');
    expect(() => BrowserUtils.doubleClick(disableElementSelector))
      .to.throw(Error)
      .with.property('message')
      .contains(`Element not enabled '${disableElementSelector}'`);
  });
});
