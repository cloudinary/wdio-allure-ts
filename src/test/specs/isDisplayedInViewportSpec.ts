import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';
import chai from 'chai';

const inViewportElement = '#DragAndDropSpec';
const notInViewportElement = '//*[@data-test="open-new-tab"]';

describeCommon('isDisplayedInViewport', () => {
  it('element is not displayed in viewport', async () => {
    await Reporter.step('check if element is displayed in viewport');
    chai.expect(await BrowserUtils.isDisplayedInViewport(inViewportElement)).to.be.false;
  });

  it('element displayed in viewport', async () => {
    await Reporter.step('check if element is displayed in viewport');
    chai.expect(await BrowserUtils.isDisplayedInViewport(notInViewportElement)).to.be.true;
  });
});
