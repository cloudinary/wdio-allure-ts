import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

const HOVER_BUTTON: string = "//*[@id='HoverSpec']//*[@id='HoverButton']";
const NOT_EXISTING_ELEMENT_SELECTOR: string = "//*[@class='AndrzejTheKing']";
/**
 * wdio-allure-ts moveTo actions on test button
 */

describeCommon('moveToSpec', () => {
  it('hoverTrue', async () => {
    await Reporter.step('scroll to hover button');
    await (await $(HOVER_BUTTON)).scrollIntoView();

    await Reporter.step('move to hover button');
    await BrowserUtils.moveTo(HOVER_BUTTON);

    await Reporter.step('Validate button hovered');
    await chai.assert.equal((await (await $(HOVER_BUTTON)).getCSSProperty('background-color')).parsed.hex, '#4caf50');
  });

  it('hoverFalse', async () => {
    await Reporter.step('Move to not existing element throws an error');
    await chai.expect(BrowserUtils.moveTo(NOT_EXISTING_ELEMENT_SELECTOR)).to.rejectedWith(Error, 'Wait for exist');
  });
});
