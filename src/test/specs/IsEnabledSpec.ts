import { assert, expect } from 'chai';
import { BrowserUtils, Reporter } from '../..';
import { TestUtils } from '../..';
import { describeCommon } from '../TestHelper';

const ENABLED_INPUT_SELECTOR: string = "//*[@id='IsEnabled']//input[@id='enabled_input']";
const DISABLED_INPUT_SELECTOR: string = "//*[@id='IsEnabled']//input[@id='disabled_input']";
describeCommon('isEnabled', () => {
  it('check enabled element', () => {
    Reporter.step('isEnabled of enabled element');
    assert.isTrue(BrowserUtils.isEnabled(ENABLED_INPUT_SELECTOR));
  });

  it('check disabled element', () => {
    Reporter.step('isEnabled of disabled element');
    assert.isFalse(BrowserUtils.isEnabled(DISABLED_INPUT_SELECTOR));
  });
  it('check not existing element', () => {
    Reporter.step('isEnabled of not existing element');
    expect(() => BrowserUtils.isEnabled(`//*[@id='${TestUtils.randomString(5)}']`))
      .to.throw(Error)
      .with.property('message')
      .contains("element wasn't found");
  });
});
