import { expect } from 'chai';
import { BrowserUtils } from '../..';
import { describeCommon } from '../TestHelper';

const REFRESH_BROWSER_FIELD: string = "//*[@id='RefreshBrowserSpec']//*[@id='RefreshBrowserCheckFiled']";

describeCommon('RefreshBrowserAction', () => {
  it('RefreshBrowserTrue', () => {
    $(REFRESH_BROWSER_FIELD).scrollIntoView();
    $(REFRESH_BROWSER_FIELD).setValue('TestText');
    BrowserUtils.refreshBrowser();
    $(REFRESH_BROWSER_FIELD).scrollIntoView();
    $(REFRESH_BROWSER_FIELD).waitForDisplayed();
    expect($(REFRESH_BROWSER_FIELD).getValue()).to.be.eq('');
  });
});
