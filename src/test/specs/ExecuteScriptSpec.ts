import { expect } from 'chai';
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

/**
 * execute
 */
describeCommon('execute', () => {
  it('successful execution', () => {
    const script: string = " document.getElementById('executeScriptButtonId').click()";
    Reporter.step('Execute a script');
    expect(() => BrowserUtils.execute(script)).to.not.throw(Error);

    const textDivSelector: string = "//*[@id='ExecuteScript']//*[@id='executeScriptDynamicText']";

    Reporter.step('Validate script execution');
    expect($(textDivSelector).getText()).to.be.eqls('Cloudinary still rules!', 'script execution failed');
  });

  it('get string result', () => {
    const pageTitle = 'HTML Sandbox';
    const script: string = 'return document.title';

    Reporter.step('Execute a script with return value');
    const currPageTitle = BrowserUtils.execute(script);

    Reporter.step('Validate script worked');
    expect(currPageTitle).to.be.eqls(pageTitle);
  });

  it('failing execution', () => {
    const script: string = 'not a script';

    Reporter.step('Validate invalid script throws an error');
    expect(() => BrowserUtils.execute(script))
      .to.throw(Error)
      .with.property('message')
      .contains(`Failed to execute script: ${script}`);
  });
});
