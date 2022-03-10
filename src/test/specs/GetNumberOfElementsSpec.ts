import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

const ELEMENT_SELECTOR: string = "//*[@id='GetNumberOfElements']//*[@data-test='element-to-count']";

/**
 * getNumberOfElements
 */
describeCommon('getNumberOfElements', () => {
  it('get number of existing elements', async () => {
    await Reporter.step('Validate return value of getNumberOfElements');
    chai.assert.equal(await BrowserUtils.getNumberOfElements(ELEMENT_SELECTOR), 2, 'Incorrect number of elements');
  });

  it('get number of not existing elements', async () => {
    await Reporter.step('Validate return value of getNumberOfElements when elements not exists');
    chai.assert.equal(
      await BrowserUtils.getNumberOfElements(`${ELEMENT_SELECTOR}//bla`),
      0,
      'Incorrect number of elements'
    );
  });

  it('undefined selector value', async () => {
    await Reporter.step('getNumberOfElements throws an error when selector is undefined');
    await chai.expect(BrowserUtils.getNumberOfElements(undefined)).to.rejectedWith(Error);
  });
});
