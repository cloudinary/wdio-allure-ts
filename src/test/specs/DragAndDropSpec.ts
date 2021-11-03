import { assert, expect } from 'chai';
import { BrowserUtils } from '../..';
import { describeCommon } from '../TestHelper';

const ELEMENT: string = '#draggedSlider';
const TARGET: string = '#staticSlider';
const NOT_EXISTING_ELEMENT: string = '//*[@id="NotExistingElement_qweqwe"]';

/**
 * wdio-allure-ts drag and drop element
 */
describeCommon('dragAndDrop', () => {
  it('drag and drop to coordinate', () => {
    const beforeDragLocation = BrowserUtils.getLocation(ELEMENT);
    BrowserUtils.dragAndDrop(ELEMENT, { x: 5, y: 0 });
    const afterDragLocation = BrowserUtils.getLocation(ELEMENT);
    assert.isTrue(afterDragLocation.x > beforeDragLocation.x, 'Element position was not changed');
  });
  it('drag and drop to element', () => {
    const delta: number = 10;
    const beforeDragLocation = BrowserUtils.getLocation(TARGET);
    BrowserUtils.dragAndDrop(ELEMENT, TARGET);
    const afterDragLocation = BrowserUtils.getLocation(ELEMENT);
    assert.isTrue(
      Math.abs(beforeDragLocation.x - afterDragLocation.x) < delta,
      'Element was not dragged toward the target element'
    );
  });
  it('drag and drop to undefined element', () => {
    expect(() => BrowserUtils.dragAndDrop(ELEMENT, undefined))
      .to.throw(Error)
      .with.property('message')
      .contains(`Failed to drag and drop ${ELEMENT} to`);
  });
  it('drag and drop to non integer coordinate', () => {
    expect(() => BrowserUtils.dragAndDrop(ELEMENT, { x: 1.5, y: 1.5 }))
      .to.throw(Error)
      .with.property('message')
      .contains(`Failed to drag and drop ${ELEMENT} to`);
  });
  it('drag and drop to non existing element', () => {
    expect(() => BrowserUtils.dragAndDrop(ELEMENT, NOT_EXISTING_ELEMENT)).to.throw(Error);
  });
});
