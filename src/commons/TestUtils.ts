/**
 * General utils useful for test
 */
export namespace TestUtils {
  /**
   * Returns random string of requested length
   * @param length length of returned string
   */
  export function randomString(length: number): string {
    let text: string = "";
    const possible: string =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    text = Array(length)
      .join()
      .split(",")
      .map(() =>
        // tslint:disable-next-line:insecure-random
        possible.charAt(Math.floor(Math.random() * possible.length))
      )
      .join("");

    return text;
  }
}
