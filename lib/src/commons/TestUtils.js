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
    /**
     * Elastic search query prohibits special chars without escaping
     * More info: https://discuss.elastic.co/t/how-to-index-special-characters-and-search-those-special-characters-in-elasticsearch/42506
     * Escaping special characters that are part of the query syntax. The current list special characters are: + - && || ! ( ) { } [ ] ^ " ~ * ? : \
     * To escape these character use the \ before the character
     * @param inputString - string that might contain special characters that needs escaping
     */
    function escapeMetaCharacters(inputString) {
        const metaCharacters = [
            '\\',
            '^',
            '$',
            '{',
            '}',
            '[',
            ']',
            '(',
            ')',
            '*',
            '+',
            '?',
            '|',
            '<',
            '>',
            '-',
            '&',
            '%',
        ];
        for (const char of metaCharacters) {
            if (inputString.includes(char)) {
                inputString.replace(char, `\/${char}`);
            }
        }
        return inputString;
    }
    TestUtils.escapeMetaCharacters = escapeMetaCharacters;
})(TestUtils = exports.TestUtils || (exports.TestUtils = {}));
