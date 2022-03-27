import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import { BrowserUtils, Reporter } from '../..';
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
  it('Switch to iframe, header text at iFrame 2', async () => {
    await Reporter.step('Validate frame 2 not displayed');
    await BrowserUtils.waitForDisplayed(FRAME_2_HEADER_1, { reverse: true });

    await Reporter.step('switch to frame 2');
    await BrowserUtils.switchToFrame(FRAME_TWO);

    await Reporter.step('Validate frame 2 displayed');
    chai.assert.equal(await (await $(FRAME_2_HEADER_1)).getText(), 'Frame 2 Heading 1');
  });

  it('iframe 2 not available after switch to iframe 1', async () => {
    await Reporter.step('Validate frame 2 not displayed');
    await BrowserUtils.waitForDisplayed(FRAME_2_HEADER_1, { reverse: true });

    await Reporter.step('switch to frame 1');
    await BrowserUtils.switchToFrame(FRAME_ONE);

    await Reporter.step('Validate frame 2 not displayed');
    await chai.expect((await $(FRAME_2_HEADER_1)).getText()).to.rejectedWith(Error);
  });

  it('Outside iframe context not accessible after switch', async () => {
    await Reporter.step('Validate element not in frames displayed');
    await BrowserUtils.waitForDisplayed(TEXT_OUTSIDE_OF_FRAMES);

    await Reporter.step('Switch to frame 1');
    await BrowserUtils.switchToFrame(FRAME_ONE);

    await Reporter.step('Validate switched to frame 1');
    await chai.expect((await $(TEXT_OUTSIDE_OF_FRAMES)).getText()).to.rejectedWith(Error);
  });

  it('Incorrect iframe selector', async () => {
    await chai.expect(BrowserUtils.switchToFrame(FRAME_DONT_EXISTS)).to.rejectedWith(Error);
  });
});
