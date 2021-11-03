import { expect } from 'chai';
import { BrowserUtils } from '../..';
import { describeCommon } from '../TestHelper';

const SELECTION_BOX: string = '//*[@id="selection_list"]';
const LIST_ITEM: string = '//option';

describeCommon('waitForNumberOfElements', () => {
  it('Expect number of elements equals', () => {
    expect(() => BrowserUtils.waitForNumberOfElements(`${SELECTION_BOX}${LIST_ITEM}`, 4)).to.not.throw(Error);
  });

  it('Expect number of elements not equals', () => {
    expect(() => BrowserUtils.waitForNumberOfElements(`${SELECTION_BOX}${LIST_ITEM}`, 3))
      .to.throw(Error)
      .with.property('message')
      .contains(`not equal`);
  });
  it('Expect 0 elements equals', () => {
    expect(() => BrowserUtils.waitForNumberOfElements("//div[@data-test='not-existing']", 0)).to.not.throw(Error);
  });

  it('Expect 0 elements not equals', () => {
    expect(() => BrowserUtils.waitForNumberOfElements(`${SELECTION_BOX}${LIST_ITEM}`, 0))
      .to.throw(Error)
      .with.property('message')
      .contains(`still displayed `);
  });

  it("Expect number of elements, element doesn't exists", () => {
    expect(() => BrowserUtils.waitForNumberOfElements(`//notExists`, 4))
      .to.throw(Error)
      .with.property('message')
      .contains(`waitUntil condition timed out`);
  });
});
