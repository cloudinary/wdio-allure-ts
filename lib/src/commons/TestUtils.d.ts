/**
 * General utils useful for test
 */
export declare namespace TestUtils {
    /**
     * Returns random string of requested length
     * @param length length of returned string
     */
    function randomString(length: number): string;
    /**
     * Elastic search query prohibits special chars without escaping
     * More info: https://discuss.elastic.co/t/how-to-index-special-characters-and-search-those-special-characters-in-elasticsearch/42506
     * Escaping special characters that are part of the query syntax. The current list special characters are: + - && || ! ( ) { } [ ] ^ " ~ * ? : \
     * To escape these character use the \ before the character
     * @param inputString - string that might contain special characters that needs escaping
     */
    function escapeMetaCharacters(inputString: string): string;
}
