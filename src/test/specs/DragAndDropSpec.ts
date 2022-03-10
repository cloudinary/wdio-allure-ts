import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

const ELEMENT: string = '#draggedSlider';
const TARGET: string = '#staticSlider';
const NOT_EXISTING_ELEMENT: string = '//*[@id="NotExistingElement_qweqwe"]';

/**
 * wdio-allure-ts drag and drop element
 */
describeCommon('dragAndDrop', () => {
  it('drag and drop to coordinate', async () => {
    const beforeDragLocation = await BrowserUtils.getLocation(ELEMENT);

    await Reporter.step('Drag and drop an element by coordinate');
    await BrowserUtils.dragAndDrop(ELEMENT, { x: 5, y: 0 });

    const afterDragLocation = await BrowserUtils.getLocation(ELEMENT);

    await Reporter.step('Validate elements position changed');
    chai.assert.isTrue(afterDragLocation.x > beforeDragLocation.x, 'Element position was not changed');
  });

  it('drag and drop to element', async () => {
    const delta: number = 10;
    const beforeDragLocation = await BrowserUtils.getLocation(TARGET);

    await Reporter.step('Drag and drop an element to target element');
    await BrowserUtils.dragAndDrop(ELEMENT, TARGET);
    const afterDragLocation = await BrowserUtils.getLocation(ELEMENT);

    await Reporter.step('Validate elements position changed');
    chai.assert.isTrue(
      Math.abs(beforeDragLocation.x - afterDragLocation.x) < delta,
      `Element was not dragged toward the target element ${beforeDragLocation.x} - ${afterDragLocation.x}`
    );
  });

  it('drag and drop to undefined element', async () => {
    await Reporter.step('Drag and drop to undefined element should throw error');
    await chai
      .expect(BrowserUtils.dragAndDrop(ELEMENT, undefined))
      .to.rejectedWith(Error, `Failed to drag and drop ${ELEMENT} to`);
  });

  it('drag and drop to non integer coordinate', async () => {
    await Reporter.step('Drag and drop to non integer coordinate should throw error');
    await chai
      .expect(BrowserUtils.dragAndDrop(ELEMENT, { x: 1.5, y: 1.5 }))
      .to.rejectedWith(Error, `Failed to drag and drop ${ELEMENT} to`);
  });

  it('drag and drop to non existing element', async () => {
    await Reporter.step('Drag and drop to non existing element should throw error');
    await chai.expect(BrowserUtils.dragAndDrop(ELEMENT, NOT_EXISTING_ELEMENT)).to.rejectedWith(Error);
  });
});
