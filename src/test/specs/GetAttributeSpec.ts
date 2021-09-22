import { assert, expect } from 'chai';
import { BrowserUtils } from '../..';
import { describeCommon } from '../TestHelper';

const WRONG_ATTRIB_DIV: string = '//*[@id="wrongAttribDiv"]';
/**
 * wdio-allure-ts getAttribute action test
 */
describeCommon('GetAttributeSpec of BrowserUtils Tests', () => {
  it('Validate positive result ', () => {
    assert.equal(BrowserUtils.getAttribute(WRONG_ATTRIB_DIV, 'data-test'), 'just-a-data-test');
  });

  it('should fail on not existing attribute', () => {
    const selector: string = WRONG_ATTRIB_DIV;
    const attributeName: string = 'ONG';

    const attr = BrowserUtils.getAttribute(selector, attributeName);
    expect(attr).to.equal(null);
  });
});
