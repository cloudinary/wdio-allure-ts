import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

/**
 * execute
 */
describeCommon('execute', () => {
  it('successful execution', async () => {
    const script: string = " document.getElementById('executeScriptButtonId').click()";
    await Reporter.step('Execute a script');
    await BrowserUtils.execute(script);

    const textDivSelector: string = "//*[@id='ExecuteScript']//*[@id='executeScriptDynamicText']";

    await Reporter.step('Validate script execution');
    chai
      .expect(await (await $(textDivSelector)).getText())
      .to.be.eqls('Cloudinary still rules!', 'script execution failed');
  });

  it('get string result', async () => {
    const pageTitle = 'HTML Sandbox';
    const script: string = 'return document.title';

    await Reporter.step('Execute a script with return value');
    const currPageTitle = await BrowserUtils.execute(script);

    await Reporter.step('Validate script worked');
    chai.expect(currPageTitle).to.be.eqls(pageTitle);
  });

  it('failing execution', async () => {
    const script: string = 'not a script';

    await Reporter.step('Validate invalid script throws an error');
    await chai.expect(BrowserUtils.execute(script)).to.rejectedWith(Error, `Failed to execute script: ${script}`);
  });
});
