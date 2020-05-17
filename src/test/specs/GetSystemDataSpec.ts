import { expect } from 'chai';
import { BrowserUtils } from '../..';

describe('GetSystemData', () => {
    it('correct data', () => {
        expect(BrowserUtils.getSystemData()).to.contain('HeadlessChrome');
    });
});
