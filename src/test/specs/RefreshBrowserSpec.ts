import { expect } from 'chai';
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

const REFRESH_BROWSER_FIELD: string = "//*[@id='RefreshBrowserSpec']//*[@id='RefreshBrowserCheckFiled']";

describeCommon('RefreshSpec', () => {
  it('RefreshTrue', async () => {
    await Reporter.step('scroll to refresh field');
    await (await $(REFRESH_BROWSER_FIELD)).scrollIntoView();

    await Reporter.step('set text value');
    await (await $(REFRESH_BROWSER_FIELD)).setValue('TestText');

    await Reporter.step('refresh browser');
    await BrowserUtils.refresh();

    await Reporter.step('scroll into view');
    await (await $(REFRESH_BROWSER_FIELD)).scrollIntoView();

    await Reporter.step('wait for field to be displayed');
    await (await $(REFRESH_BROWSER_FIELD)).waitForDisplayed();

    await Reporter.step('validate field text');
    expect(await (await $(REFRESH_BROWSER_FIELD)).getValue()).to.be.eq('');
  });
});
