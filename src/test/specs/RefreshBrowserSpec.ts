import { expect } from 'chai';
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

const REFRESH_BROWSER_FIELD: string = "//*[@id='RefreshBrowserSpec']//*[@id='RefreshBrowserCheckFiled']";

describeCommon('RefreshSpec', () => {
  it('RefreshTrue', () => {
    Reporter.step('scroll to refresh field');
    $(REFRESH_BROWSER_FIELD).scrollIntoView();

    Reporter.step('set text value');
    $(REFRESH_BROWSER_FIELD).setValue('TestText');

    Reporter.step('refresh browser');
    BrowserUtils.refresh();

    Reporter.step('scroll into view');
    $(REFRESH_BROWSER_FIELD).scrollIntoView();

    Reporter.step('wait for field to be displayed');
    $(REFRESH_BROWSER_FIELD).waitForDisplayed();

    Reporter.step('validate field text');
    expect($(REFRESH_BROWSER_FIELD).getValue()).to.be.eq('');
  });
});
