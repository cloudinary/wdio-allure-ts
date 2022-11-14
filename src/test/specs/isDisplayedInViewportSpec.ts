import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

const selector = '#DragAndDropSpec';

describeCommon('isDisplayedInViewport', () => {
  it('element displayed in viewport', async () => {
    await Reporter.step('check if element is displayed in viewport');
    await BrowserUtils.isDisplayedInViewport(selector);
  });

  it('element is not displayed in viewport', async () => {
    await Reporter.step('check if element is displayed in viewport');
    await BrowserUtils.isDisplayedInViewport(selector);
  });
});
