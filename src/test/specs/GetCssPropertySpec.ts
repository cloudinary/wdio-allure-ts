import { assert, expect } from 'chai';
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

const HEADER: string = '//*[@id="headerSection-1"]/h1';

/**
 * wdio-allure-ts url action test
 */
describeCommon('getCssProperty', () => {
  it('retrieve css property', () => {
    Reporter.step('Get css property');
    expect(BrowserUtils.getCssProperty(HEADER, 'background-color').value).contains('(255,255,255');
  });

  it('incorrect selector of an element', () => {
    Reporter.step('get ccs property with incorrect selector throws an error');
    expect(() => BrowserUtils.getCssProperty("//*[@id='incorrect']", 'background-color'))
      .to.throw(Error)
      .with.property('message');
  });

  it('null params', () => {
    Reporter.step('get css property with null param throws an error');
    expect(() => JSON.stringify(BrowserUtils.getCssProperty(null, null)))
      .to.throw(Error)
      .with.property('message');
  });

  it('incorrect css property', () => {
    Reporter.step('get css property returns null if property incorrect');
    assert.isNotNull(JSON.stringify(BrowserUtils.getCssProperty(HEADER, 'bg-color')));
  });
});
