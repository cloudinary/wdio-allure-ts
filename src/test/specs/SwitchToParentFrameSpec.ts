import { assert } from 'chai';
import { BrowserUtils } from '../../commons/BrowserUtils';
import { describeCommon } from '../TestHelper';
import { Reporter } from '../../index';

const IFRAME_ELEMNT1: string = "//*[@id='iframe1']";
const IFRAME_HEADER: string = "//*[@id='textOutsideOfFrames']";

/**
 * switch to parent frame
 */
describeCommon('SwitchToParentIframe', () => {
  it('Switch from iframe to Iframe parent', async () => {
    await Reporter.step('Switch to iframe1');
    await BrowserUtils.switchToFrame(IFRAME_ELEMNT1);

    await Reporter.step('Switch to parent iframe');
    await BrowserUtils.switchToParentFrame();

    await Reporter.step('Check parent iframe header text');
    assert.equal(await (await $(IFRAME_HEADER)).getText(), 'OutSide frame text');
  });

  it('Check to parent iframe without error', async () => {
    await Reporter.step('Change to parent iframe');
    await BrowserUtils.switchToParentFrame();

    await Reporter.step('Check parent iframe header');
    assert.equal(await (await $(IFRAME_HEADER)).getText(), 'OutSide frame text');
  });
});
