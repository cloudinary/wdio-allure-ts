//tslint:disable:no-unsafe-any
import { FileLogHandler } from '@applitools/eyes-sdk-core';
import { By, Eyes, Target } from '@applitools/eyes-webdriverio';
import { Reporter } from './Reporter';

/**
 * View port area to set screen size for screenshots consistency
 */
const SCREEN_WIDTH: number = 1024;
const SCREEN_HEIGHT: number = 768;

export interface IBoundingBox {
  width: number;
  height: number;
}

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
  public open(testDesc: string, testName: string, isDebug?: boolean, boundingBoxObj?: IBoundingBox): EyesUtil {
    Reporter.debug(`Set Debug Mode ${isDebug}`);
    this.setEyeDebugMode(isDebug);

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
  public checkWithIgnores(checkDescription: string, xPaths: string[]): EyesUtil {
    let targetWindowObj: Target = Target.window();

    xPaths.forEach((elementXpath: string) => {
      targetWindowObj = targetWindowObj.ignore(By.xpath(elementXpath));
    });

    browser.call(() => {
      return this.eyes.check(checkDescription, targetWindowObj);
    });

    return this;
  }

  /**
   *  Full Page screenshots including scrolling (very slow)
   * @param checkDesc - Unique Test ID
   */
  public checkPageLayout(checkDesc: string): void {
    Reporter.debug('Take view port screenshots');
    browser.call(() => {
      return this.eyes.check(checkDesc, Target.window().layout());
    });
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
   * Set Debug mode
   * If set to true the eyes.log file will appear under the root folder.
   */
  public setEyeDebugMode(isDebug: boolean): EyesUtil {
    if (isDebug) {
      browser.call(() => {
        return this.eyes.setLogHandler(new FileLogHandler(isDebug));
      });
    }

    return this;
  }
}
