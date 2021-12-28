import { expect } from 'chai';
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

const PARENT_SELECTOR: string = "//*[@id='wait-for-displayed']";
const NOT_EXISTING_ELEMENT_SELECTOR: string = `${PARENT_SELECTOR}//*[@data-test='NOT_EXISTING_ELEMENT_SELECTOR']`;
const DISPLAYED_ELEMENT_SELECTOR: string = `${PARENT_SELECTOR}//*[@id='DISPLAYED_ELEMENT']`;
const ADD_MORE_BUTTON: string = `${PARENT_SELECTOR}//*[@id='add_new_button']`;
const HIDDEN_ELEMENT_SELECTOR: string = `${PARENT_SELECTOR}//*[@id='hidden_element']`;
/**
 * waitForDisplayed spec
 */
describeCommon('waitForDisplayed', () => {
  it('wait for visible element', () => {
    Reporter.step('click button');
    BrowserUtils.click(ADD_MORE_BUTTON);

    Reporter.step('wait for displayed');
    BrowserUtils.waitForDisplayed(DISPLAYED_ELEMENT_SELECTOR);
  });

  it('not existing element', () => {
    Reporter.step('not existing element throws an error');
    expect(() => BrowserUtils.waitForDisplayed(NOT_EXISTING_ELEMENT_SELECTOR)).to.throw(Error);
  });

  it('hidden element', () => {
    Reporter.step('hidden element throws an error');
    expect(() => BrowserUtils.waitForDisplayed(HIDDEN_ELEMENT_SELECTOR)).to.throw(Error);
  });
});
