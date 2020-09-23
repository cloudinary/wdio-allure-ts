import { expect } from 'chai';
import { BrowserUtils } from '../..';
import { describeCommon } from '../TestHelper';

const PARENT_SELECTOR: string = "//*[@id='select-by-value']";
const EXISTING_ELEMENT_SELECTOR: string = `${PARENT_SELECTOR}//*[@id='list-of-values']`;
const EXISTING_VALUE: string = 'saab';
const NOT_EXISTING_VALUE: string = `${PARENT_SELECTOR}//*[@id='EXISTING_ELEMENT_SELECTOR']`;
const HIDDEN_VALUE: string = `${PARENT_SELECTOR}//*[@id='EXISTING_ELEMENT_SELECTOR']`;
const NOT_EXISTING_ELEMENT_SELECTOR: string = `${PARENT_SELECTOR}//*[@id='not-existing-list-of-values']`;

describeCommon('selectByValue', () => {
  it('select by existing value', () => {
    BrowserUtils.selectByValue(EXISTING_ELEMENT_SELECTOR, EXISTING_VALUE);
  });

  it('select by none existing value', () => {
    BrowserUtils.selectByValue(EXISTING_ELEMENT_SELECTOR, NOT_EXISTING_VALUE);
    expect(() => BrowserUtils.selectByValue(EXISTING_ELEMENT_SELECTOR, NOT_EXISTING_VALUE))
      .to.throw(Error)
      .with.property('message')
      .contains('Failed to select ');
  });

  it.only('select hidden element by value', () => {
    expect(() => BrowserUtils.selectByValue(NOT_EXISTING_ELEMENT_SELECTOR, HIDDEN_VALUE))
      .to.throw(Error)
      .with.property('message')
      .contains('Element not exist');
  });
});
