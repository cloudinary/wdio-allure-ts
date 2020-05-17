import { expect } from 'chai';
import { BrowserUtils } from '../../commons/BrowserUtils';
import { describeCommon } from '../TestHelper';

const ENABLED_ELEMENT_SELECTOR: string = "//button[@id='click_to_enable_second_button']";
const DISABLED_ELEMENT_SELECTOR: string = "//button[@id='disabled_button']";
const NOT_EXISTS_ELEMENT_SELECTOR: string = "//button[@id='disabled_button1234']";
describeCommon('waitForEnabled', () => {
    it('element enabled', () => {
        BrowserUtils.click(ENABLED_ELEMENT_SELECTOR);
        expect(() => BrowserUtils.waitForEnabled(ENABLED_ELEMENT_SELECTOR)).to.not.throw(Error);
    });
    it('element disabled', () => {
        expect(() => BrowserUtils.waitForEnabled(DISABLED_ELEMENT_SELECTOR))
            .to.throw(Error)
            .with.property('message')
            .contains(`Element not enabled`);
    });
    it('element not exists', () => {
        expect(() => BrowserUtils.waitForEnabled(NOT_EXISTS_ELEMENT_SELECTOR))
            .to.throw(Error)
            .with.property('message')
            .contains(`Element not exist`);
    });
});
