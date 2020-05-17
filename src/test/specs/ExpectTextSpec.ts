import { expect } from 'chai';
import { BrowserUtils } from '../../commons/BrowserUtils';
import { describeCommon } from '../TestHelper';

const TEST_FIELD_SELECTOR: string = "//*[@id='ExpectText']";
const STATIC_TEXT_SELECTOR: string = `${TEST_FIELD_SELECTOR}//*[@id='static_text']`;
const DYNAMIC_TEXT_SELECTOR: string = `${TEST_FIELD_SELECTOR}//*[@id='dynamic_text']`;
const HIDDEN_TEXT_SELECTOR: string = `${TEST_FIELD_SELECTOR}//*[@id='hidden_text']`;
const CHANGE_TEXT_BUTTON_SELECTOR: string = `${TEST_FIELD_SELECTOR}//button[@id='update_text']`;
/**
 * wdio-allure-ts expectedText tests
 */
describeCommon('expectText', () => {
    it('correct text', () => {
        expect(() => BrowserUtils.expectText(STATIC_TEXT_SELECTOR, 'Cloudinary rules!')).to.not.throw();
    });

    it('hidden text', () => {
        expect(() => BrowserUtils.expectText(HIDDEN_TEXT_SELECTOR, 'Cloudinary rules!'))
            .to.throw()
            .with.property('message')
            .contains('Element not visible');
    });

    it('dynamic text', () => {
        $(CHANGE_TEXT_BUTTON_SELECTOR).waitForDisplayed();

        $(CHANGE_TEXT_BUTTON_SELECTOR).click();
        BrowserUtils.expectText(DYNAMIC_TEXT_SELECTOR, 'Cloudinary still rules!');
    });

    it('fail on case sensitive', () => {
        expect(() => BrowserUtils.expectText(STATIC_TEXT_SELECTOR, 'cloudinary rules!'))
            .to.throw(Error)
            .with.property('message')
            .contains('waitUntil condition timed out');
    });

    it('fail on spaces', () => {
        expect(() => BrowserUtils.expectText(STATIC_TEXT_SELECTOR, 'Cloudinary  rules!'))
            .to.throw(Error)
            .with.property('message')
            .contains('waitUntil condition timed out');
    });

    it('fail on wrong text', () => {
        expect(() => BrowserUtils.expectText(STATIC_TEXT_SELECTOR, 'Cloudinary not rules!'))
            .to.throw(Error)
            .with.property('message')
            .contains('waitUntil condition timed out');
    });
});
