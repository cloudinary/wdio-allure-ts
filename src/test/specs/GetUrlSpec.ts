import { expect } from 'chai';
import { BrowserUtils, Reporter } from '../..';
import { describeCommon, sampleAppUrl } from '../TestHelper';

describeCommon('GetUrlSpec', () => {
  it('get url', () => {
    Reporter.step('Validate getUrl return value');
    expect(BrowserUtils.getUrl()).to.equal(sampleAppUrl);
  });
});
