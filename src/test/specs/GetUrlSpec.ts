import { expect } from 'chai';
import { BrowserUtils } from '../..';
import { describeCommon, sampleAppUrl } from '../TestHelper';

describeCommon('GetUrlSpec', () => {
    it('get url', () => {
        expect(BrowserUtils.getUrl()).to.equal(sampleAppUrl);
    });
});
