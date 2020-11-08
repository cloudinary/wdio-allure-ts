import path from 'path';

/**
 * General utils useful for test
 */

export namespace TestUtils {
  /**
   * Returns random string of requested length
   * if no length passed, length value will be 5
   * @param length length of returned string (optional)
   */
  export function randomString(length: number = 5): string {
    const possible: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    return Array(length)
      .join()
      .split(',')
      .map(() =>
        // tslint:disable-next-line:insecure-random
        possible.charAt(Math.floor(Math.random() * possible.length))
      )
      .join('');
  }

  /**
   * Return string that contains only the numbers from the original string.
   * @param str string to get only numbers from
   */
  export function extractNumbersFromString(str: string): string {
    return str.replace(/[^0-9]/g, '');
  }

  /**
   * Return object of data by file path
   *  path File located in wdio config file,
   */
  export function getDataFromFile(): object {
    // @ts-ignore
    const dataFilename = browser.config.configDataFilePath;
    const dataFilePath = path.resolve(process.cwd(), dataFilename);
    return require(dataFilePath);
  }

  /**
   * Get data by tag from e2eTestData file
   * @param dataTag string
   */
  export function getData(dataTag: string = process.env.TEST_DATA_TAG): object {
    const data: object = getDataFromFile();
    return data && data[dataTag];
  }
}
