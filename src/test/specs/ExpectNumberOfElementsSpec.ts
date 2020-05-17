import { expect } from 'chai';
import { BrowserUtils } from '../..';
import { describeCommon } from '../TestHelper';

const SELECTION_BOX: string = '//*[@id="selection_list"]';
const LIST_ITEM: string = '//option';

describeCommon('expectNumberOfElements', () => {
    it('Expect number of elements equals', () => {
        expect(() => BrowserUtils.expectNumberOfElements(`${SELECTION_BOX}${LIST_ITEM}`, 4)).to.not.throw(Error);
    });

    it('Expect number of elements not equals', () => {
        expect(() => BrowserUtils.expectNumberOfElements(`${SELECTION_BOX}${LIST_ITEM}`, 3))
            .to.throw(Error)
            .with.property('message')
            .contains(`not equal`);
    });
    it('Expect 0 elements equals', () => {
        expect(() => BrowserUtils.expectNumberOfElements(`${SELECTION_BOX}`, 0))
            .to.throw(Error)
            .with.property('message')
            .contains(`element not visible`);
    });

    it('Expect 0 elements not equals', () => {
        expect(() => BrowserUtils.expectNumberOfElements(`${SELECTION_BOX}${LIST_ITEM}`, 0))
            .to.throw(Error)
            .with.property('message')
            .contains(`element not visible`);
    });

    it("Expect number of elements, element doesn't exists", () => {
        expect(() => BrowserUtils.expectNumberOfElements(`//notExists`, 4))
            .to.throw(Error)
            .with.property('message')
            .contains(`waitUntil condition timed out`);
    });
});
