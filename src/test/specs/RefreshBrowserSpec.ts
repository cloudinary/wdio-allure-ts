import { expect } from 'chai';
import { BrowserUtils } from '../..';
import { describeCommon } from '../TestHelper';

const REFRESH_BROWSER_FIELD: string = "//*[@id='RefreshBrowserSpec']//*[@id='RefreshBrowserCheckFiled']";

describeCommon('RefreshSpec', () => {
  it('RefreshTrue', () => {
    $(REFRESH_BROWSER_FIELD).scrollIntoView();
    $(REFRESH_BROWSER_FIELD).setValue('TestText');
    BrowserUtils.refresh();
    $(REFRESH_BROWSER_FIELD).scrollIntoView();
    $(REFRESH_BROWSER_FIELD).waitForDisplayed();
    expect($(REFRESH_BROWSER_FIELD).getValue()).to.be.eq('');
  });
});
