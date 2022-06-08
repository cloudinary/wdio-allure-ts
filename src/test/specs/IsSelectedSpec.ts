import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

const PARENT_SELECTOR: string = "//*[@id='IsSelected']";
const SELECTED_ELEMENT_SELECTOR: string = `${PARENT_SELECTOR}//*[@data-test='selected']`;
const NOT_SELECTED_ELEMENT_SELECTOR: string = `${PARENT_SELECTOR}//*[@data-test='not-selected']`;

/**
 * isSelected
 */

describeCommon('isSelected', () => {
  it('element selected', async () => {
    await Reporter.step('Check selected element');
    chai.expect(await BrowserUtils.isSelected(SELECTED_ELEMENT_SELECTOR)).to.be.true;
  });

  it('element not selected', async () => {
    await Reporter.step('Check not selected element');
    chai.expect(await BrowserUtils.isSelected(NOT_SELECTED_ELEMENT_SELECTOR)).to.be.false;
  });
});
