import { expect } from 'chai';
import { BrowserUtils, Reporter } from '../..';
import { describeCommon, sampleAppUrl } from '../TestHelper';

const navigationButton: string = "//button[@data-test='navigate-to-cloudinary']";

describeCommon('BackSpec', () => {
  it('back browser', () => {
    Reporter.step('Click navigation button');
    $(navigationButton).click();

    Reporter.step('Click back button');
    BrowserUtils.back();

    Reporter.step(`Validate url is ${sampleAppUrl}`);
    expect(browser.getUrl()).to.equal(sampleAppUrl);
  });
});
