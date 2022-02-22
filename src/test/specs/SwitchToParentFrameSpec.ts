import { assert } from 'chai';
import { BrowserUtils } from '../../commons/BrowserUtils';
import { describeCommon } from '../TestHelper';
import { Reporter } from '../../index';

const IFRAME_ELEMNT1: string = "//*[@id='iframe1']";
const IFRAME_HEADER: string = "//*[@id='textOutsideOfFrames']";

/**
 * switch to parent frame
 */
describeCommon('ChangeIframe', () => {
  it('Change iframe', () => {
    Reporter.step(`Change to iframe - ${IFRAME_ELEMNT1}`);
    BrowserUtils.switchToFrame(IFRAME_ELEMNT1);

    Reporter.step(`Change to parent iframe`);
    BrowserUtils.switchToParentFrame();

    Reporter.step(`Check parent iframe header`);
    assert.equal($(IFRAME_HEADER).getText(), 'OutSide frame text');
  });

  it('Switch to parent iframe', () => {
    Reporter.step(`Change to parent iframe`);
    BrowserUtils.switchToParentFrame();

    Reporter.step(`Check parent iframe header`);
    assert.equal($(IFRAME_HEADER).getText(), 'OutSide frame text');
  });
});
