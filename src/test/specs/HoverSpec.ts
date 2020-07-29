import { assert, expect } from 'chai';
import { BrowserUtils } from '../..';
import { describeCommon } from '../TestHelper';

const HOVER_BUTTON: string = "//*[@id='HoverSpec']//*[@id='HoverButton']";
const NOT_EXISITING_ELEMENT_SELECTOR: string = "//*[@class='AndrzejTheKing']";
/**
 * wdio-allure-ts Hover actions on test button
 */

describeCommon('HoverAction', () => {
  it('hoverTrue', () => {
    $(HOVER_BUTTON).scrollIntoView();
    BrowserUtils.hover(HOVER_BUTTON);
    assert.equal($(HOVER_BUTTON).getCSSProperty('background-color').parsed.hex, '#4caf50');
  });

  it('hoverFalse', () => {
    expect(() => BrowserUtils.hover(NOT_EXISITING_ELEMENT_SELECTOR))
      .to.throw(Error)
      .with.property('message')
      .contains('Element not exist');
  });
});
