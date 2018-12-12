import { assert, expect } from 'chai';
import { BrowserUtils } from '../../src/commons/BrowserUtils';
import { describeCommon } from '../TestHelper';

/**
 * wdio-allure-ts getAttribute action test
 */
describeCommon('GetAttributeSpec of BrowserUtils Tests', () => {
  it('Validate positive result ', () => {
    assert.equal(BrowserUtils.getAttribute('//form', 'method'), 'post');
  });

  it('Validate null result ending in err', () => {
    expect(() => BrowserUtils.getAttribute('//form', 'name'))
      .to.throw(Error)
      .with.property('message')
      .contains(`Failed to get name attribute`);
  });

  it('Validate incorrect value ending in err', () => {
    expect(() => BrowserUtils.getAttribute('//form', 'ONG'))
      .to.throw(Error)
      .with.property('message')
      .contains(`Failed to get ONG`);
  });
});
