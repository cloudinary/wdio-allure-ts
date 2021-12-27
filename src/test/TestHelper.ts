import { BrowserUtils, Reporter } from '..';

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
    beforeEach(() => {
      Reporter.step('Navigate to sample app');
      BrowserUtils.url(sampleAppUrl);
      Reporter.step('Wait for sample app to load');
      BrowserUtils.waitForDisplayed("//*[@id='top']");
    });

    /**
     * Test context
     */
    body();
  });
}
