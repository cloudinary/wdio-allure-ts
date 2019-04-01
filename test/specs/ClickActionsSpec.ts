import * as chai from 'chai';
import chaiString from 'chai-string';
chai.use(chaiString);
import { BrowserUtils } from '../../src/commons/BrowserUtils';
import { describeCommon, sampleAppUrl } from '../TestHelper';

export namespace PageLocator {
  export const SUBMIT_BUTTON_ONE: string =
    "//*[@id='clickActionSpec']/p[1]/input";
  export const DOUBLE_CLICK_DIV: string = "//*[@id='div-double-click']";
}

/**
 * wdio-allure-ts Click actions on element test
 */
describeCommon('click', () => {
  it('singleClick ', () => {
    BrowserUtils.click(PageLocator.SUBMIT_BUTTON_ONE);
    chai.expect(browser.getUrl()).to.endsWith('/submit');
  });

  it('doubleClick', () => {
    BrowserUtils.navigateToUrl(sampleAppUrl);
    BrowserUtils.doubleClick(PageLocator.DOUBLE_CLICK_DIV);
    BrowserUtils.expectText(PageLocator.DOUBLE_CLICK_DIV, 'Double Click Event');
  });
});
