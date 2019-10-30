//tslint:disable
import { FileLogHandler } from '@applitools/eyes-sdk-core';
import { By, Eyes, Target } from '@applitools/eyes-webdriverio';
import { inspect } from 'util';
import { Reporter } from './Reporter';

/**
 * View port area to set screen size for screenshots consistency
 */
const SCREEN_WIDTH: number = 1024;
const SCREEN_HEIGHT: number = 768;
const TIMEOUT: number = 4000; // default 2000

export interface IBoundingBox {
  width: number;
  height: number;
}

export interface IResult {
  _asExpected: boolean;
  _windowId: string;
}

let result: IResult = { _asExpected: false, _windowId: undefined };

/**
 * Class wraps the Applitools util for UI or Images comparison
 */
export class EyesUtil {
  public eyes: Eyes;

  constructor(apiKey: string) {
    this.eyes = new Eyes();
    this.eyes.setApiKey(apiKey);
    this.eyeConfiguration(false);
  }

  /**
   * Opens the eye session
   * @param testDesc - Run ID
   * @param testName - Product name
   * @param boundingBoxObj - Bounding box to screenshots
   */
  public open(testDesc: string, testName: string, boundingBoxObj?: IBoundingBox): EyesUtil {
    Reporter.debug('Open eyes');
    browser.call(() => {
      return this.eyes.open(
        browser,
        testName,
        testDesc,
        boundingBoxObj === undefined ? { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } : boundingBoxObj
      );
    });

    Reporter.debug('Eyes Opened');

    return this;
  }

  /**
   * Since SDK doesn't support array of elements to ignore this method should bypass that limitation
   * @param checkDescription - Test/Step name (unique)
   * @param xPaths - array of By.type objects to ignore in check
   */
  public checkWithIgnores(checkDescription: string, xPaths: string[]): boolean {
    let targetWindowObj: Target = Target.window();

    xPaths.forEach((elementXpath: string) => {
      targetWindowObj = targetWindowObj.ignore(By.xpath(elementXpath));
    });

    result = browser.call(() => {
      return this.eyes.check(checkDescription, targetWindowObj);
    });

    Reporter.debug(`TEST RESULT: ${inspect(result._asExpected)}`);

    return result._asExpected;
  }

  /**
   *  Full Page screenshots including scrolling (very slow)
   * @param checkDesc - Unique Test ID
   */
  public checkPageLayout(checkDesc: string): boolean {
    Reporter.debug('Take view port screenshots');

    result = browser.call(() => {
      return this.eyes.check(checkDesc, Target.window(TIMEOUT).layout());
    });

    Reporter.debug(`TEST RESULT: ${result._asExpected}`);

    return result._asExpected;
  }

  /**
   * Close eye batch
   */
  public close(): void {
    Reporter.debug('Close eyes');
    browser.call(() => {
      return this.eyes.close();
    });
    Reporter.debug('Eyes Closed');
  }

  /**
   *  Set basic configuration
   * @param onOff - flag to turn on and off
   */
  public eyeConfiguration(onOff: boolean): EyesUtil {
    Reporter.debug('Configure eyes');
    browser.call(() => {
      return this.eyes.setHideScrollbars(onOff);
    });

    browser.call(() => {
      return this.eyes.setForceFullPageScreenshot(onOff);
    });

    return this;
  }

  /**
   * Set Debug Mode On
   */
  public setEyeDebugMode(): EyesUtil {
    browser.call(() => {
      return this.eyes.setLogHandler(new FileLogHandler(true));
    });

    return this;
  }
}
