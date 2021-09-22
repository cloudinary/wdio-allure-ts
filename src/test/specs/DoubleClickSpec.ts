import { expect } from 'chai';
import { BrowserUtils } from '../..';
import { describeCommon } from '../TestHelper';

/**
 * doubleClick
 */
describeCommon('doubleClick', () => {
  it('successful double click', () => {
    expect(() => BrowserUtils.doubleClick("//button[@id='doubleClickToEnable']")).to.not.throw(Error);
    expect(() => BrowserUtils.waitForEnabled("//button[@id='doubleClickWillBeEnabledButton']")).to.not.throw(Error);
  });

  it('double click not existing element', () => {
    const notExistingElementSelector: string = '//notARealSelector';
    expect(() => BrowserUtils.doubleClick(notExistingElementSelector))
      .to.throw(Error)
      .with.property('message')
      .contains(` element ("${notExistingElementSelector}") still not existing`);
  });

  it('double click hidden element', () => {
    const hiddenElementSelector: string = "//button[@id='doubleClickHidden']";
    expect(() => BrowserUtils.doubleClick(hiddenElementSelector))
      .to.throw(Error)
      .with.property('message')
      .contains(`Element not visible '${hiddenElementSelector}'`);
  });

  it.only('double click disabled element', () => {
    const disableElementSelector: string = "//button[@id='doubleClickDisabledButton']";
    expect(() => BrowserUtils.doubleClick(disableElementSelector))
      .to.throw(Error)
      .with.property('message')
      .contains(`Element not enabled '${disableElementSelector}'`);
  });
});
