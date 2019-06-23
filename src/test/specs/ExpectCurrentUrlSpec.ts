import { expect } from 'chai';
import { BrowserUtils } from '../../commons/BrowserUtils';
import { describeCommon, sampleAppUrl } from '../TestHelper';

const CLOUDINARY_URL: string = 'https://cloudinary.com';
/**
 * wdio-allure-ts ExpectCurrentUrlSpec
 */
describeCommon('expectCurrentUrl', () => {
  it('correct url', () => {
    expect(() => BrowserUtils.expectCurrentUrl(sampleAppUrl)).to.not.throw(Error);
  });

  it('incorrect url', () => {
    expect(() => BrowserUtils.expectCurrentUrl(CLOUDINARY_URL))
      .to.throw(Error)
      .with.property('message')
      .equal(`Url not as expected '${CLOUDINARY_URL}'`);
  });
});
