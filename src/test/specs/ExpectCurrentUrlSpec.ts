import { expect } from 'chai';
import { BrowserUtils, Reporter } from '../..';
import { describeCommon, sampleAppUrl } from '../TestHelper';

const CLOUDINARY_URL: string = 'https://cloudinary.com';
/**
 * wdio-allure-ts waitForUrl
 */
describeCommon('waitForUrl', () => {
  it('correct url', () => {
    Reporter.step('Wait for url');
    expect(() => BrowserUtils.waitForUrl(sampleAppUrl)).to.not.throw(Error);
  });

  it('incorrect url', () => {
    Reporter.step('Wait for incorrect url throws an error');
    expect(() => BrowserUtils.waitForUrl(CLOUDINARY_URL))
      .to.throw(Error)
      .with.property('message')
      .equal(`Url not as expected '${CLOUDINARY_URL}'`);
  });
});
