"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * General utils useful for test
 */
var TestUtils;
(function (TestUtils) {
    /**
     * Returns random string of requested length
     * @param length length of returned string
     */
    function randomString(length) {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        text = Array(length)
            .join()
            .split(',')
            .map(() => 
        // tslint:disable-next-line:insecure-random
        possible.charAt(Math.floor(Math.random() * possible.length)))
            .join('');
        return text;
    }
    TestUtils.randomString = randomString;
})(TestUtils = exports.TestUtils || (exports.TestUtils = {}));
