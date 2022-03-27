import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import { BrowserUtils, Reporter } from '../..';
import { describeCommon, sampleAppUrl } from '../TestHelper';

const CLOUDINARY_URL: string = 'https://cloudinary.com';
/**
 * wdio-allure-ts waitForUrl
 */
describeCommon('waitForUrl', () => {
  it('correct url', async () => {
    await Reporter.step('Wait for url');
    await BrowserUtils.waitForUrl(sampleAppUrl);
  });

  it('incorrect url', async () => {
    await Reporter.step('Wait for incorrect url throws an error');
    await chai
      .expect(BrowserUtils.waitForUrl(CLOUDINARY_URL))
      .to.rejectedWith(Error, `Url not as expected '${CLOUDINARY_URL}'`);
  });
});
