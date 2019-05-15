import { expect } from 'chai';
import { BrowserUtils } from '../..';
import { describeCommon } from '../TestHelper';

const VISIBLE_ELEMENT_SELECTOR: string = "//*[@data-test='visible-btn']";
const NOT_VISIBLE_ELEMENT_SELECTOR: string = "//*[@data-test='not-visible-btn']";
const NOT_EXIST_ELEMENT_SELECTOR: string = "//*[@data-test='no-such-element']";
const DISAPPEARING_ELEMENT_SELECTOR: string = "//*[@data-test='disappearing-btn']";
/**
 * wdio-allure-ts notVisible action test
 */
describeCommon('notVisible', () => {
    it('visible element', () => {
        expect(() => BrowserUtils.notVisible(VISIBLE_ELEMENT_SELECTOR))
            .to.throw(Error)
            .with.property('message')
            .contains('Failed to validate element not visible');
    });

    it('notVisible element ', () => {
        expect(() => BrowserUtils.notVisible(NOT_VISIBLE_ELEMENT_SELECTOR)).to.not.throw(Error);
    });

    it('not exist element ', () => {
        expect(() => BrowserUtils.notVisible(NOT_EXIST_ELEMENT_SELECTOR)).to.not.throw(Error);
    });

    it('disappearing element', () => {
        expect(() => BrowserUtils.waitForDisplayed(DISAPPEARING_ELEMENT_SELECTOR)).to.not.throw(Error);
        $(DISAPPEARING_ELEMENT_SELECTOR).click();

        expect(() => BrowserUtils.notVisible(DISAPPEARING_ELEMENT_SELECTOR)).to.not.throw(Error);
    });
});
