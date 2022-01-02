import { assert, expect } from 'chai';
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

const ELEMENT_SELECTOR: string = "//*[@id='GetNumberOfElements']//*[@data-test='element-to-count']";

/**
 * getNumberOfElements
 */
describeCommon('getNumberOfElements', () => {
  it('get number of existing elements', () => {
    Reporter.step('Validate return value of getNumberOfElements');
    assert.equal(BrowserUtils.getNumberOfElements(ELEMENT_SELECTOR), 2, 'Incorrect number of elements');
  });

  it('get number of not existing elements', () => {
    Reporter.step('Validate return value of getNumberOfElements when elements not exists');
    assert.equal(BrowserUtils.getNumberOfElements(`${ELEMENT_SELECTOR}//bla`), 0, 'Incorrect number of elements');
  });

  it('undefined selector value', () => {
    Reporter.step('getNumberOfElements throws an error when selector is undefined');
    expect(() => BrowserUtils.getNumberOfElements(undefined)).to.throw(Error);
  });
});
