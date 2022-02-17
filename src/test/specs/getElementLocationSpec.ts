import { assert } from 'chai';
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

const ELEMENT: string = '#GetElementLocation';

let location: { x?: number; y?: number };

/**
 * wdio-allure-ts get element location
 */
describeCommon('getLocation', () => {
  it('get element Location', () => {
    const expectedX: number = 22;
    const expectedY: number = 8;

    Reporter.step('validate get location returned value');
    location = BrowserUtils.getLocation(ELEMENT);
    assert.equal(location.x, expectedX, 'Element X position');
    assert.equal(location.y, expectedY, 'Element Y position');
  });
});