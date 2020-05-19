import { BrowserUtils } from '../commons/BrowserUtils';

/**
 * Holds common methods for tests
 */
export const sampleAppUrl: string = 'http://127.0.0.1:8000/';
/**
 * common describe for specs
 * @param name spec name
 * @param body spec body -placeholder
 */
// tslint:disable-next-line:export-name
export function describeCommon(name: string, body: Function): void {
    describe(`${name}`, () => {
        /**
         * Navigate to sampleApp and wait for it to load
         */
        beforeEach(() => {
            BrowserUtils.navigateToUrl(sampleAppUrl);
            BrowserUtils.waitForDisplayed("//*[@id='top']");
        });

        /**
         * Test context
         */
        body(`${name}`);
    });
}
