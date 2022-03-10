import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
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
  it('wait for visible element', async () => {
    await Reporter.step('click button');
    await BrowserUtils.click(ADD_MORE_BUTTON);

    await Reporter.step('wait for displayed');
    await BrowserUtils.waitForDisplayed(DISPLAYED_ELEMENT_SELECTOR);
  });

  it('not existing element', async () => {
    await Reporter.step('not existing element throws an error');
    await chai.expect(BrowserUtils.waitForDisplayed(NOT_EXISTING_ELEMENT_SELECTOR)).to.rejectedWith(Error);
  });

  it('hidden element', async () => {
    await Reporter.step('hidden element throws an error');
    await chai.expect(BrowserUtils.waitForDisplayed(HIDDEN_ELEMENT_SELECTOR)).to.rejectedWith(Error);
  });
});
