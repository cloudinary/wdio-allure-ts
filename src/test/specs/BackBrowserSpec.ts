import { expect } from 'chai';
import { BrowserUtils } from '../..';
import { describeCommon, sampleAppUrl } from '../TestHelper';

const navigationButton: string = "//button[@data-test='navigate-to-cloudinary']";

describeCommon('BackSpec', () => {
  it('back browser', () => {
    $(navigationButton).click();
    BrowserUtils.back();

    expect(browser.getUrl()).to.equal(sampleAppUrl);
  });
});
