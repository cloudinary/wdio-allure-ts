import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';
import chai from 'chai';

const existSelector = '#DragAndDropSpec';
const notExistSelector = '#DragAndDropSpec123';

describeCommon('isDisplayedInViewport', () => {
  it('element is not displayed in viewport', async () => {
    await Reporter.step('check if element is displayed in viewport');
    chai.expect(await BrowserUtils.isDisplayedInViewport(notExistSelector)).to.be.false;
  });

  it('element displayed in viewport', async () => {
    await Reporter.step('check if element is displayed in viewport');
    chai.expect(await BrowserUtils.isDisplayedInViewport(existSelector)).to.be.true;
  });
});
