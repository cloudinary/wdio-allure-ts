import { assert, expect } from 'chai';
import { BrowserUtils } from '../../src/commons/BrowserUtils';
import { describeCommon } from '../TestHelper';

/**
 * wdio-allure-ts navigateToUrl action test
 */
describeCommon('getCssProperty', () => {
  it.only('retrieve css property', () => {
    assert.equal(
      BrowserUtils.getCssProperty(
        "//*[@data-test='print-message-btn']",
        'background-color'
      ).value,
      'rgba(0,128,0,1)'
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
      .with.property('message');
  });
  //tslint:disable:no-null-keyword
  it('null params', () => {
    expect(() => JSON.stringify(BrowserUtils.getCssProperty(null, null)))
      .to.throw(Error)
      .with.property('message');
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
