import { assert, expect } from 'chai';
import { BrowserUtils } from '../..';
import { describeCommon } from '../TestHelper';

const HEADER: string = '//*[@id="headerSection-1"]/h1';

/**
 * wdio-allure-ts navigateToUrl action test
 */
describeCommon('getCssProperty', () => {
  it('retrieve css property', () => {
    expect(BrowserUtils.getCssProperty(HEADER, 'background-color').value).contains('(255,255,255');
  });

  it('incorrect selector of an element', () => {
    expect(() => BrowserUtils.getCssProperty("//*[@id='incorrect']", 'background-color'))
      .to.throw(Error)
      .with.property('message');
  });

  it('null params', () => {
    expect(() => JSON.stringify(BrowserUtils.getCssProperty(null, null)))
      .to.throw(Error)
      .with.property('message');
  });

  it('incorrect css property', () => {
    assert.isNotNull(JSON.stringify(BrowserUtils.getCssProperty(HEADER, 'bg-color')));
  });
});
