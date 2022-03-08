import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

const HEADER: string = '//*[@id="headerSection-1"]/h1';

/**
 * wdio-allure-ts url action test
 */
describeCommon('getCssProperty', () => {
  it('retrieve css property', async () => {
    await Reporter.step('Get css property');
    chai.expect((await BrowserUtils.getCssProperty(HEADER, 'background-color')).value).contains('(255,255,255');
  });

  it('incorrect selector of an element', async () => {
    await Reporter.step('get ccs property with incorrect selector throws an error');
    await chai
      .expect(BrowserUtils.getCssProperty("//*[@id='incorrect']", 'background-color'))
      .to.rejectedWith(Error, 'Failed to get css Property ');
  });

  it('null params', async () => {
    await Reporter.step('get css property with null param throws an error');
    await chai
      .expect(BrowserUtils.getCssProperty(null, null))
      .to.rejectedWith(Error, "Failed to get css Property 'null' from 'null'");
  });

  it('incorrect css property', async () => {
    await Reporter.step('get css property returns null if property incorrect');
    await chai.assert.isNotNull(JSON.stringify(await BrowserUtils.getCssProperty(HEADER, 'bg-color')));
  });
});
