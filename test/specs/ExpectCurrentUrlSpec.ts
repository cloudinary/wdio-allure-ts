import { expect } from 'chai';
import { BrowserUtils } from '../../src/commons/BrowserUtils';
import { describeCommon } from '../TestHelper';

const NAVIGATION_BUTTON_SELECTOR: string = '//button[@id="openCloudinaryUrl"]';
const CLOUDINARY_URL: string = 'https://cloudinary.com';
/**
 * wdio-allure-ts ExpectCurrentUrlSpec
 */
describeCommon('expectCurrentUrl', () => {
  it.skip('correct url', () => {
    $(NAVIGATION_BUTTON_SELECTOR).click();
    expect(() => BrowserUtils.expectCurrentUrl(CLOUDINARY_URL)).to.not.throw(Error);
  });

  it.skip('incorrect url', () => {
    expect(() => BrowserUtils.expectCurrentUrl(CLOUDINARY_URL))
      .to.throw(Error)
      .with.property('message')
      .equal(`Url not as expected '${CLOUDINARY_URL}'`);
  });
});
