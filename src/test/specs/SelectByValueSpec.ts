import { expect } from 'chai';
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

const PARENT_SELECTOR: string = "//*[@id='select-by-value']";
const EXISTING_ELEMENT_SELECTOR: string = `${PARENT_SELECTOR}//*[@id='list-of-values']`;
const EXISTING_VALUE: string = 'saab';
const NOT_EXISTING_VALUE: string = `${PARENT_SELECTOR}//*[@id='EXISTING_ELEMENT_SELECTOR']`;
const HIDDEN_VALUE: string = `${PARENT_SELECTOR}//*[@id='EXISTING_ELEMENT_SELECTOR']`;
const NOT_EXISTING_ELEMENT_SELECTOR: string = `${PARENT_SELECTOR}//*[@id='not-existing-list-of-values']`;

/**
 * selectByValue
 */

describeCommon('selectByValue', () => {
  it('select by existing value', () => {
    Reporter.step('Select by existing attribute value');
    BrowserUtils.selectByAttribute(EXISTING_ELEMENT_SELECTOR, 'value', EXISTING_VALUE);
  });

  it('select by none existing value', () => {
    Reporter.step('Select by not existing attribute value throws an error');
    expect(() => BrowserUtils.selectByAttribute(EXISTING_ELEMENT_SELECTOR, 'value', NOT_EXISTING_VALUE))
      .to.throw(Error)
      .with.property('message')
      .contains('Failed to select ');
  });

  it('select hidden element by value', () => {
    Reporter.step('Select by hidden attribute value throws an error');
    expect(() => BrowserUtils.selectByAttribute(NOT_EXISTING_ELEMENT_SELECTOR, 'value', HIDDEN_VALUE)).to.throw(Error);
  });
});
