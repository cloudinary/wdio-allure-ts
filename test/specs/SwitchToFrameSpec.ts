import { assert, expect } from 'chai';
import { BrowserUtils } from '../../src/commons/BrowserUtils';
import { describeCommon } from '../TestHelper';

const FRAME_2_HEADER_1: string = "//*[@id='frame2Header1']";
const TEXT_OUTSIDE_OF_FRAMES: string = "//*[@id='textOutsideOfFrames']";
const FRAME_ONE: string = "//*[@id='iframe1']";
const FRAME_TWO: string = "//*[@id='iframe2']";
const FRAME_DONT_EXISTS: string = "//*[@id='iframeDontExists']";
/**
 * wdio-allure-ts Switch to iFrame actions
 */
describeCommon('switchToIframe', () => {
    it('Switch to iframe, header text at iFrame 2', () => {
        BrowserUtils.notVisible(FRAME_2_HEADER_1);
        BrowserUtils.switchToFrame(FRAME_TWO);
        assert.equal($(FRAME_2_HEADER_1).getText(), 'Frame 2 Heading 1');
    });

    it('iframe 2 not available after switch to iframe 1', () => {
        BrowserUtils.notVisible(FRAME_2_HEADER_1);
        BrowserUtils.switchToFrame(FRAME_ONE);
        expect(() => $(FRAME_2_HEADER_1).getText()).to.throw(Error);
    });

    it('Outside iframe context not accessible after switch', () => {
        BrowserUtils.waitForDisplayed(TEXT_OUTSIDE_OF_FRAMES);
        BrowserUtils.switchToFrame(FRAME_ONE);
        expect(() => $(TEXT_OUTSIDE_OF_FRAMES).getText()).to.throw(Error);
    });

    it('Incorrect iframe selector', () => {
        expect(() => BrowserUtils.switchToFrame(FRAME_DONT_EXISTS)).to.throw(Error);
    });
});
