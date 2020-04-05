/**
 * General utils useful for test
 */
export namespace TestUtils {
  /**
   * Returns random string of requested length
   * @param length length of returned string
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
}
