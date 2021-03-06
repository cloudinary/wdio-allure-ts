import { expect } from 'chai';
import { BrowserUtils } from '../..';
import { describeCommon } from '../TestHelper';

/**
 * executeScript
 */
describeCommon('executeScript', () => {
  it('successful execution', () => {
    const script: string = " document.getElementById('executeScriptButtonId').click()";
    expect(() => BrowserUtils.executeScript(script)).to.not.throw(Error);

    const textDivSelector: string = "//*[@id='ExecuteScript']//*[@id='executeScriptDynamicText']";
    expect($(textDivSelector).getText()).to.be.eqls('Cloudinary still rules!', 'script execution failed');
  });

  it('get string result', () => {
    const pageTitle = 'HTML Sandbox';
    const script: string = 'return document.title';
    const currPageTitle = BrowserUtils.executeScript(script);
    expect(currPageTitle).to.be.eqls(pageTitle);
  });

  it('failing execution', () => {
    const script: string = 'not a script';
    expect(() => BrowserUtils.executeScript(script))
      .to.throw(Error)
      .with.property('message')
      .contains(`Failed to execute script: ${script}`);
  });
});
