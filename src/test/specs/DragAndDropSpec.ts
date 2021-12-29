import { assert, expect } from 'chai';
import { BrowserUtils, Reporter } from '../..';
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

    Reporter.step('Drag and drop an element by coordinate');
    BrowserUtils.dragAndDrop(ELEMENT, { x: 5, y: 0 });

    const afterDragLocation = BrowserUtils.getLocation(ELEMENT);

    Reporter.step('Validate elements position changed');
    assert.isTrue(afterDragLocation.x > beforeDragLocation.x, 'Element position was not changed');
  });
  it('drag and drop to element', () => {
    const delta: number = 10;
    const beforeDragLocation = BrowserUtils.getLocation(TARGET);

    Reporter.step('Drag and drop an element to target element');
    BrowserUtils.dragAndDrop(ELEMENT, TARGET);
    const afterDragLocation = BrowserUtils.getLocation(ELEMENT);

    Reporter.step('Validate elements position changed');
    assert.isTrue(
      Math.abs(beforeDragLocation.x - afterDragLocation.x) < delta,
      'Element was not dragged toward the target element'
    );
  });
  it('drag and drop to undefined element', () => {
    Reporter.step('Drag and drop to undefined element should throw error');
    expect(() => BrowserUtils.dragAndDrop(ELEMENT, undefined))
      .to.throw(Error)
      .with.property('message')
      .contains(`Failed to drag and drop ${ELEMENT} to`);
  });
  it('drag and drop to non integer coordinate', () => {
    Reporter.step('Drag and drop to non integer coordinate should throw error');
    expect(() => BrowserUtils.dragAndDrop(ELEMENT, { x: 1.5, y: 1.5 }))
      .to.throw(Error)
      .with.property('message')
      .contains(`Failed to drag and drop ${ELEMENT} to`);
  });
  it('drag and drop to non existing element', () => {
    Reporter.step('Drag and drop to non existing element should throw error');
    expect(() => BrowserUtils.dragAndDrop(ELEMENT, NOT_EXISTING_ELEMENT)).to.throw(Error);
  });
});
