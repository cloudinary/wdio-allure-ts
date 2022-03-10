import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

const VISIBLE_ELEMENT_SELECTOR: string = "//*[@data-test='visible-btn']";
const NOT_VISIBLE_ELEMENT_SELECTOR: string = "//*[@data-test='not-visible-btn']";
const NOT_EXIST_ELEMENT_SELECTOR: string = "//*[@data-test='no-such-element']";
const DISAPPEARING_ELEMENT_SELECTOR: string = "//*[@data-test='disappearing-btn']";
/**
 * wdio-allure-ts waitForDisplayed - reverse - true action test
 */
describeCommon('waitForDisplayed - reverse: true', () => {
  it('displayed element', async () => {
    await Reporter.step('Wait for element to be displayed');
    await chai
      .expect(BrowserUtils.waitForDisplayed(VISIBLE_ELEMENT_SELECTOR, { reverse: true }))
      .to.rejectedWith(Error, 'still displayed ');
  });

  it('notDisplayed but exist element ', async () => {
    await Reporter.step('Hidden element throws an error');
    await BrowserUtils.waitForDisplayed(NOT_VISIBLE_ELEMENT_SELECTOR, { reverse: true });
  });

  it('not exist element ', async () => {
    await Reporter.step('Not existing element throws an error');
    await BrowserUtils.waitForDisplayed(NOT_EXIST_ELEMENT_SELECTOR, { reverse: true });
  });

  it('disappearing element', async () => {
    await Reporter.step('Validate element displayed');
    await BrowserUtils.waitForDisplayed(DISAPPEARING_ELEMENT_SELECTOR);
    await Reporter.step('Click on element to disappear');
    await $(DISAPPEARING_ELEMENT_SELECTOR).click();

    await Reporter.step('Validate element not displayed');
    await BrowserUtils.waitForDisplayed(DISAPPEARING_ELEMENT_SELECTOR, { reverse: true });
  });
});
