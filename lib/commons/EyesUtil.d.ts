import { Eyes } from '@applitools/eyes-webdriverio';
export interface IBoundingBox {
    width: number;
    height: number;
}
export interface IEyesAbstract {
    open(testDesc: string, testName: string, boundingBoxObj?: IBoundingBox): EyesUtil;
    checkWithIgnores(checkDescription: string, xPaths: string[]): EyesUtil;
    checkPageLayout(checkDesc: string): void;
    close(): void;
    eyeConfiguration(onOff: boolean): EyesUtil;
}
/**
 * Class wraps the Applitools util for UI or Images comparison
 */
declare class EyesUtil implements IEyesAbstract {
    eyes: Eyes;
    constructor(apiKey: string);
    /**
     * Opens the eye session
     * @param testDesc - Run ID
     * @param testName - Product name
     * @param boundingBoxObj - Bounding box to screenshots
     */
    open(testDesc: string, testName: string, boundingBoxObj?: IBoundingBox): EyesUtil;
    /**
     * Since SDK doesn't support array of elements to ignore this method should bypass that limitation
     * @param checkDescription - Test/Step name (unique)
     * @param xPaths - array of By.type objects to ignore in check
     */
    checkWithIgnores(checkDescription: string, xPaths: string[]): EyesUtil;
    /**
     *  Full Page screenshots including scrolling (very slow)
     * @param checkDesc - Unique Test ID
     */
    checkPageLayout(checkDesc: string): void;
    /**
     * Close eye batch
     */
    close(): void;
    /**
     *  Set basic configuration
     * @param onOff - flag to turn on and off
     */
    eyeConfiguration(onOff: boolean): EyesUtil;
}
export { EyesUtil };
