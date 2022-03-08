import { BrowserUtils, Reporter } from '..';
import { assert } from 'chai';

/**
 * Holds common methods for tests
 */
export const sampleAppUrl: string = 'http://127.0.0.1:8000/';
/**
 * common describe for specs
 * @param name spec name
 * @param body spec body -placeholder
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function describeCommon(name: string, body: () => any): void {
  describe(`${name}`, () => {
    /**
     * Navigate to sampleApp and wait for it to load
     */
    beforeEach(async () => {
      try {
        await Reporter.step('Navigate to sample app');
        await BrowserUtils.url(sampleAppUrl);
        await Reporter.step('Wait for sample app to load');
        await BrowserUtils.waitForDisplayed("//*[@id='top']");
        await Reporter.closeStep(false);
      } catch (e) {
        const errorStr: string = e.toString();
        await Reporter.error(errorStr);
        await Reporter.closeStep(true);
        assert.fail(errorStr);
      }
    });

    /**
     * Test context
     */
    body();
  });
}
