import { assert, expect } from 'chai';
import { BrowserUtils } from '../..';
import { describeCommon } from '../TestHelper';

const ELEMENT: string = '#draggedThumb';
const TARGET: string = '#staticThumb';
const NOT_EXISTING_ELEMENT: string = '//*[@id="NotExistingElement_qweqwe"]';

let beforeDragLocation: WebdriverIO.DragAndDropCoordinate;
let afterDragLocation: WebdriverIO.DragAndDropCoordinate;

/**
 * wdio-allure-ts drag and drop element
 */
describeCommon('dragAndDrop', () => {
  it('drag and drop to coordinate', () => {
    beforeDragLocation = BrowserUtils.getElementLocation(ELEMENT);
    BrowserUtils.dragAndDrop(ELEMENT, { x: 5, y: 0 });
    afterDragLocation = BrowserUtils.getElementLocation(ELEMENT);
    assert.isTrue(afterDragLocation.x > beforeDragLocation.x, 'Element position was not changed');
  });
  it('drag and drop to element', () => {
    const delta: number = 10;
    beforeDragLocation = BrowserUtils.getElementLocation(TARGET);
    BrowserUtils.dragAndDrop(ELEMENT, TARGET);
    afterDragLocation = BrowserUtils.getElementLocation(ELEMENT);
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
    expect(() => BrowserUtils.dragAndDrop(ELEMENT, NOT_EXISTING_ELEMENT))
      .to.throw(Error)
      .with.property('message')
      .contains('Element not exist');
  });
});
