import { assert, expect } from 'chai';
import { BrowserUtils } from '../../src/commons/BrowserUtils';
import { describeCommon } from '../TestHelper';
import { SelectorType } from '../../src/enums/SelectorType';

/**
 * wdio-allure-ts getAttribute action test
 */
describeCommon('GetAttributeSpec of BrowserUtils Tests', () => {
  it('Validate positive result ', () => {
    assert.equal(
      BrowserUtils.getAttribute(SelectorType.XPATH, '//form', 'method'),
      'post'
    );
  });

  it('Validate null result ending in err', () => {
    expect(() =>
      BrowserUtils.getAttribute(SelectorType.XPATH, '//form', 'name')
    )
      .to.throw(Error)
      .with.property('message')
      .contains(`Failed to get name attribute`);
  });

  it('Validate incorrect value ending in err', () => {
    expect(() => BrowserUtils.getAttribute(SelectorType.XPATH, '//form', 'ONG'))
      .to.throw(Error)
      .with.property('message')
      .contains(`Failed to get ONG`);
  });
});
