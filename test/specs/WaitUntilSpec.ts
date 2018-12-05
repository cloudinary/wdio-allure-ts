// tslint:disable-next-line:no-http-string
import { assert } from 'chai';
import {BrowserUtils} from "../../src/commons/BrowserUtils";

// tslint:disable-next-line:no-http-string
const sampleAppUrl: string = 'http://127.0.0.1:8000/';
const TIMEOUT : number = 3000;

/**
 * wdio-allure-ts WaitUntil test
 */
describe('GetAttributeSpec of BrowserUtils Tests', () => {
    it('Validate positive result ', () => {
        BrowserUtils.navigateToUrl(sampleAppUrl);

        assert.isTrue(BrowserUtils.waitUntil(  () => browser.getText("//*[@class='button-print-message']") === 'Print message', TIMEOUT));
    });

});
