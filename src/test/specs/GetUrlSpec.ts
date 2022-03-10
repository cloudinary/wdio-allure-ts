import { expect } from 'chai';
import { BrowserUtils, Reporter } from '../..';
import { describeCommon, sampleAppUrl } from '../TestHelper';

describeCommon('GetUrlSpec', () => {
  it('get url', async () => {
    await Reporter.step('Validate getUrl return value');
    expect(await BrowserUtils.getUrl()).to.equal(sampleAppUrl);
  });
});
