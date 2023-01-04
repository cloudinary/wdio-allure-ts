import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

const CLOUDINARY_URL: string = 'https://cloudinary.com';
/**
 * wdio-allure-ts waitForUrl with exact match false
 */
describeCommon('waitForUrl with exact match false', () => {
  it('correct url', async () => {
    await Reporter.step('Wait for url');
    await BrowserUtils.waitForUrl('http://', false);
  });

  it('incorrect url with exact match false', async () => {
    await Reporter.step('Wait for incorrect url throws an error');
    await chai
      .expect(BrowserUtils.waitForUrl(CLOUDINARY_URL, false))
      .to.rejectedWith(Error, `Url not as expected '${CLOUDINARY_URL}'`);
  });
});
