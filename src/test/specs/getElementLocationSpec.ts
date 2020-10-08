import { assert } from 'chai';
import { BrowserUtils } from '../..';
import { describeCommon } from '../TestHelper';

const ELEMENT: string = '#GetElementLocation';

let location: { x?: number; y?: number } = {};

/**
 * wdio-allure-ts get element location
 */
describeCommon('getElementLocation', () => {
  it('get element Location', () => {
    const expectedX: number = 22;
    const expectedY: number = 8;

    location = BrowserUtils.getElementLocation(ELEMENT);
    assert.equal(location.x, expectedX, 'Element X position');
    assert.equal(location.y, expectedY, 'Element Y position');
  });
});
