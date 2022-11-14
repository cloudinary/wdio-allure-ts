import { BrowserUtils, Reporter } from '../..';
import chai from 'chai';
import { describeCommon } from '../TestHelper';

describeCommon('isDisplayedInViewport', () => {
  it('element displayed in viewport', async () => {
    await Reporter.step('check if element is displayed in viewport');
    chai.expect(await BrowserUtils.isDisplayedInViewport('#DragAndDropSpec')).to.be.true;
  });

  it('element is not displayed in viewport', async () => {
    await Reporter.step('check if element is displayed in viewport');
    chai.expect(await BrowserUtils.isDisplayedInViewport('#DragAndDropSpec314')).to.be.false;
  });
});
