import { assert, expect } from 'chai';
import { BrowserUtils } from '../../src/commons/BrowserUtils';

// tslint:disable-next-line:no-http-string
const sampleAppUrl: string = 'http://127.0.0.1:8000/';
/**
 * wdio-allure-ts navigateToUrl action test
 */
describe('getCssProperty', () => {
  it('retrieve css property', () => {
    BrowserUtils.navigateToUrl(sampleAppUrl);

    assert.equal(
      BrowserUtils.getCssProperty(
        "//*[@data-test='print-message-btn']",
        'background-color'
      ).parsed.hex,
      '#008000'
    );
  });

  it('incorrect selector of an element', () => {
    BrowserUtils.navigateToUrl(sampleAppUrl);
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
    BrowserUtils.navigateToUrl(sampleAppUrl);

    expect(() => JSON.stringify(BrowserUtils.getCssProperty(null, null)))
      .to.throw(Error)
      .with.property('message')
      .contains('Failed to get css Property null from null');
  });

  it('incorrect css property', () => {
    BrowserUtils.navigateToUrl(sampleAppUrl);

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
