import { assert, expect } from 'chai';
import { BrowserUtils } from '../..';
import { describeCommon } from '../TestHelper';

const ELEMENT_SELECTOR: string = "//*[@id='GetNumberOfElements']//*[@data-test='element-to-count']";

/**
 * getNumberOfElements
 */
describeCommon('getNumberOfElements', () => {
    it('get number of existing elements', () => {
        assert.equal(BrowserUtils.getNumberOfElements(ELEMENT_SELECTOR), 2, 'Incorrect number of elements');
    });

    it('get number of not existing elements', () => {
        assert.equal(BrowserUtils.getNumberOfElements(`${ELEMENT_SELECTOR}//bla`), 0, 'Incorrect number of elements');
    });

    it('undefined selector value', () => {
        expect(() => BrowserUtils.getNumberOfElements(undefined))
            .to.throw(Error)
            .with.property('message')
            .contains('selector needs to be typeof `string` or `function`');
    });
});
