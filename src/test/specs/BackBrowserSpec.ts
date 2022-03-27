import { expect } from 'chai';
import { BrowserUtils, Reporter } from '../..';
import { describeCommon, sampleAppUrl } from '../TestHelper';

const navigationButton: string = "//button[@data-test='navigate-to-cloudinary']";

describeCommon('BackSpec', () => {
  it('back browser', async () => {
    await Reporter.step('Click navigation button');
    await BrowserUtils.click(navigationButton);

    await Reporter.step('Click back button');
    await BrowserUtils.back();

    await Reporter.step(`Validate url is ${sampleAppUrl}`);
    expect(await browser.getUrl()).to.equal(sampleAppUrl);
  });
});
