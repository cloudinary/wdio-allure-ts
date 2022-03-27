import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
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
  it('select by existing value', async () => {
    await Reporter.step('Select by existing attribute value');
    await BrowserUtils.selectByAttribute(EXISTING_ELEMENT_SELECTOR, 'value', EXISTING_VALUE);
  });

  it('select by none existing value', async () => {
    await Reporter.step('Select by not existing attribute value throws an error');
    await chai
      .expect(BrowserUtils.selectByAttribute(EXISTING_ELEMENT_SELECTOR, 'value', NOT_EXISTING_VALUE))
      .to.rejectedWith(Error, 'Failed to select ');
  });

  it('select hidden element by value', async () => {
    await Reporter.step('Select by hidden attribute value throws an error');
    await chai
      .expect(BrowserUtils.selectByAttribute(NOT_EXISTING_ELEMENT_SELECTOR, 'value', HIDDEN_VALUE))
      .to.rejectedWith(Error);
  });
});
