import { assert, expect } from 'chai';
import { EOL } from 'os';
import { BrowserUtils } from '../../src/commons/BrowserUtils';
import { describeCommon } from '../TestHelper';

/**
 * wdio-allure-ts getAttribute action test
 */
describeCommon('GetAttributeSpec of BrowserUtils Tests', () => {
  it('Validate positive result ', () => {
    assert.equal(BrowserUtils.getAttribute('//form', 'method'), 'post');
  });

  it('should fail on not existing attribute', () => {
    const selector: string = '//form';
    const attributeName: string = 'ONG';
    const errorMessage: string = `Failed to get '${attributeName}' attribute from '${selector}' ${EOL} Error: Found multiple results matching requested attribute '${attributeName}' or no results for element: '${selector}'`;

    expect(() => BrowserUtils.getAttribute(selector, attributeName))
      .to.throw(Error)
      .with.property('message')
      .contains(errorMessage);
  });
});
