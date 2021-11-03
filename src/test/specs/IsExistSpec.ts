import { expect } from 'chai';
import { BrowserUtils } from '../..';
import { describeCommon } from '../TestHelper';

const PARENT_SELECTOR: string = "//*[@id='is-exist']";
const EXISTING_ELEMENT_SELECTOR: string = `${PARENT_SELECTOR}//*[@id='is-exist-button']`;
const NOT_EXISTING_ELEMENT_SELECTOR: string = `${PARENT_SELECTOR}//*[@id='not-existing-button']`;

/**
 * waitForExist
 */

describeCommon('waitForExist', () => {
  it('existing element', () => {
    BrowserUtils.waitForExist(EXISTING_ELEMENT_SELECTOR);
  });

  it('not existing element', () => {
    expect(() => BrowserUtils.waitForExist(NOT_EXISTING_ELEMENT_SELECTOR)).to.throw(Error);
  });
});
