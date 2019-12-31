import { Eyes } from '@applitools/eyes-webdriverio';
export interface IBoundingBox {
    width: number;
    height: number;
}
export interface IResult {
    _asExpected: boolean;
    _windowId: string;
}
/**
 * Class wraps the Applitools util for UI or Images comparison
 */
export declare class EyesUtil {
    public eyes: Eyes;
    constructor(apiKey: string);
    /**
     * Opens the eye session
     * @param testName - Test ID
     * @param appName - Product name
     * @param boundingBoxObj - Bounding box to screenshots
     */
    public   open(testName: string, appName: string, boundingBoxObj?: IBoundingBox): EyesUtil;
    /**
     * Since SDK doesn't support array of elements to ignore this method should bypass that limitation
     * @param checkDescription - Step name (unique)
     * @param xPaths - array of By.type objects to ignore in check
     */
    public  checkWithIgnores(checkDescription: string, xPaths: string[]): boolean;
    /**
     *  Full Page screenshots including scrolling (very slow)
     * @param checkDesc - Unique Step ID
     */
    public  checkPageLayout(checkDesc: string): boolean;
    /**
     * Close eye test
     */
    public close(): void;
    /**
     *  Set basic configuration
     * @param onOff - flag to turn on and off
     */
    public   eyeConfiguration(onOff: boolean): EyesUtil;
    /**
     * Set batch name for run
     */
    public  setBatchName(batchName: string): EyesUtil;
    /**
     * Set Debug Mode On
     */
    public   setEyeDebugMode(): EyesUtil;
    /**
     * checking only element area
     * @param fileName unique name of file
     * @param selector for checking
     */
    public checkElement(fileName: string, selector: string): boolean;
}
