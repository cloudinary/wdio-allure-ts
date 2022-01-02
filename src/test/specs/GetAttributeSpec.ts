import { assert, expect } from 'chai';
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

const WRONG_ATTRIB_DIV: string = '//*[@id="wrongAttribDiv"]';
/**
 * wdio-allure-ts getAttribute action test
 */
describeCommon('GetAttributeSpec of BrowserUtils Tests', () => {
  it('Validate positive result ', () => {
    Reporter.step('Get attribute');
    assert.equal(BrowserUtils.getAttribute(WRONG_ATTRIB_DIV, 'data-test'), 'just-a-data-test');
  });

  it('should return null on not existing attribute', () => {
    const selector: string = WRONG_ATTRIB_DIV;
    const attributeName: string = 'ONG';
    Reporter.step('get attribute of not existing element');
    const attr = BrowserUtils.getAttribute(selector, attributeName);
    expect(attr).to.equal(null);
  });
});
