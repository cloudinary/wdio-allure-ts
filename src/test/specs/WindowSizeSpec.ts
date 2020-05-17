import { assert } from 'chai';
import { BrowserUtils } from '../../commons/BrowserUtils';

let size: { width?: number; height?: number } = {};
/**
 * wdio-allure-ts Change window size and get window size
 */
describe('setWindowSize', () => {
    it('change window size', () => {
        const width: number = 800;
        const height: number = 600;
        BrowserUtils.setWindowSize(width, height);

        size = BrowserUtils.getWindowSize();
        assert.equal(size.width, width, 'window width');
        assert.equal(size.height, height, 'window height');
    });
});
