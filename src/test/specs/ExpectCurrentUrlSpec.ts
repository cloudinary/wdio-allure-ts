import { expect } from 'chai';
import { BrowserUtils } from '../..';
import { describeCommon, sampleAppUrl } from '../TestHelper';

const CLOUDINARY_URL: string = 'https://cloudinary.com';
/**
 * wdio-allure-ts waitForUrl
 */
describeCommon('waitForUrl', () => {
  it('correct url', () => {
    expect(() => BrowserUtils.waitForUrl(sampleAppUrl)).to.not.throw(Error);
  });

  it('incorrect url', () => {
    expect(() => BrowserUtils.waitForUrl(CLOUDINARY_URL))
      .to.throw(Error)
      .with.property('message')
      .equal(`Url not as expected '${CLOUDINARY_URL}'`);
  });
});
