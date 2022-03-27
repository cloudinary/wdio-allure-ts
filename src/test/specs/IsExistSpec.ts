import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

const PARENT_SELECTOR: string = "//*[@id='is-exist']";
const EXISTING_ELEMENT_SELECTOR: string = `${PARENT_SELECTOR}//*[@id='is-exist-button']`;
const NOT_EXISTING_ELEMENT_SELECTOR: string = `${PARENT_SELECTOR}//*[@id='not-existing-button']`;

/**
 * waitForExist
 */

describeCommon('waitForExist', () => {
  it('existing element', async () => {
    await Reporter.step('Wait for exist of existing element');
    await BrowserUtils.waitForExist(EXISTING_ELEMENT_SELECTOR);
  });

  it('not existing element', async () => {
    await Reporter.step('Wait for exist of not existing element');
    await chai.expect(BrowserUtils.waitForExist(NOT_EXISTING_ELEMENT_SELECTOR)).to.rejectedWith(Error);
  });
});
