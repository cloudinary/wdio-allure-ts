import { BrowserUtils } from '../src/commons/BrowserUtils';

/**
 * Holds common methods for tests
 */

// tslint:disable-next-line:no-http-string
export const sampleAppUrl: string = 'http://127.0.0.1:8000/';
/**
 * common describe for specs
 * @param name spec name
 * @param body spec body -placeholder
 */
// tslint:disable-next-line:export-name
export function describeCommon(name: string, body: Function): void {
  describe(`${name}`, () => {
    before(() => {
      BrowserUtils.navigateToUrl(sampleAppUrl);
    });
    /**
     * Navigate to sampleApp and refresh the page
     */
    beforeEach(() => {
      browser.refresh();
    });

    /**
     * Test context
     */
    body(`${name}`);
  });
}
