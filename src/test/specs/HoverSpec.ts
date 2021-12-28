import { assert, expect } from 'chai';
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

const HOVER_BUTTON: string = "//*[@id='HoverSpec']//*[@id='HoverButton']";
const NOT_EXISITING_ELEMENT_SELECTOR: string = "//*[@class='AndrzejTheKing']";
/**
 * wdio-allure-ts moveTo actions on test button
 */

describeCommon('moveToSpec', () => {
  it('hoverTrue', () => {
    Reporter.step('scroll to hover button');
    $(HOVER_BUTTON).scrollIntoView();
    Reporter.step('move to hover button');
    BrowserUtils.moveTo(HOVER_BUTTON);
    Reporter.step('Validate button hovered');
    assert.equal($(HOVER_BUTTON).getCSSProperty('background-color').parsed.hex, '#4caf50');
  });

  it('hoverFalse', () => {
    Reporter.step('Move to not existing element throws an error');
    expect(() => BrowserUtils.moveTo(NOT_EXISITING_ELEMENT_SELECTOR)).to.throw(Error);
  });
});
