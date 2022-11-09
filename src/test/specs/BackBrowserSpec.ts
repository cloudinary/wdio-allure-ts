import { expect } from 'chai';
import { BrowserUtils, Reporter } from '../..';
import { describeCommon, sampleAppUrl } from '../TestHelper';

describeCommon('BackSpec', () => {
  it('back browser', async () => {
    await Reporter.step('Click navigation button');
    await BrowserUtils.url('https://cloudinary.com/');

    await Reporter.step('Click back button');
    await BrowserUtils.back();

    await Reporter.step(`Validate url is ${sampleAppUrl}`);
    expect(await BrowserUtils.getUrl()).to.equal(sampleAppUrl);
  });
});
