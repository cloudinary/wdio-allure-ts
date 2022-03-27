import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

const SELECTION_BOX: string = '//*[@id="selection_list"]';
const LIST_ITEM: string = '//option';

describeCommon('waitForNumberOfElements', () => {
  it('Expect number of elements equals', async () => {
    await Reporter.step('Wait for number of elements');
    await BrowserUtils.waitForNumberOfElements(`${SELECTION_BOX}${LIST_ITEM}`, 4);
  });

  it('Expect number of elements not equals', async () => {
    await Reporter.step('Incorrect number of elements throws an error');
    await chai
      .expect(BrowserUtils.waitForNumberOfElements(`${SELECTION_BOX}${LIST_ITEM}`, 3))
      .to.rejectedWith(Error, `not equal`);
  });
  it('Expect 0 elements equals', async () => {
    await Reporter.step('Number of not existing elements is 0');
    await BrowserUtils.waitForNumberOfElements("//div[@data-test='not-existing']", 0);
  });

  it('Expect 0 elements not equals', async () => {
    await Reporter.step('Number of elements is 0 throws an error');
    await chai
      .expect(BrowserUtils.waitForNumberOfElements(`${SELECTION_BOX}${LIST_ITEM}`, 0))
      .to.rejectedWith(Error, `still displayed `);
  });

  it("Expect number of elements, element doesn't exists", async () => {
    await Reporter.step('Number of not existing elements > 0 throws an error');
    await chai
      .expect(BrowserUtils.waitForNumberOfElements(`//notExists`, 4))
      .to.rejectedWith(Error, `waitUntil condition timed out`);
  });
});
