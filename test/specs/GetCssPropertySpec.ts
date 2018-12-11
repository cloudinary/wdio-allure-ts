import { assert, expect } from 'chai';
import { BrowserUtils } from '../../src/commons/BrowserUtils';
import { describeCommon } from '../TestHelper';

/**
 * wdio-allure-ts navigateToUrl action test
 */
describeCommon('getCssProperty', () => {
  it('retrieve css property', () => {
    assert.equal(
      BrowserUtils.getCssProperty(
        "//*[@data-test='print-message-btn']",
        'background-color'
      ).parsed.hex,
      '#008000'
    );
  });

  it('incorrect selector of an element', () => {
    expect(() =>
      BrowserUtils.getCssProperty(
        "//[@data-test='print-message-btn']",
        'background-color'
      )
    )
      .to.throw(Error)
      .with.property('message')
      .contains('Failed to get css Property background-color from');
  });

  it('null params', () => {
    expect(() => JSON.stringify(BrowserUtils.getCssProperty(null, null)))
      .to.throw(Error)
      .with.property('message')
      .contains('Failed to get css Property null from null');
  });

  it('incorrect css property', () => {
    assert.isNotNull(
      JSON.stringify(
        BrowserUtils.getCssProperty(
          "//*[@data-test='print-message-btn']",
          'bg-color'
        )
      )
    );
  });
});
