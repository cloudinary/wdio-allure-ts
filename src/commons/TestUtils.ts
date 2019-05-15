/**
 * General utils useful for test
 */
export namespace TestUtils {
    /**
     * Returns random string of requested length
     * @param length length of returned string
     */
    export function randomString(length: number): string {
        let text: string = '';
        const possible: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        text = Array(length)
            .join()
            .split(',')
            .map(() =>
                // tslint:disable-next-line:insecure-random
                possible.charAt(Math.floor(Math.random() * possible.length))
            )
            .join('');

        return text;
    }

    /**
     * Elastic search query prohibits special chars without escaping
     * More info: https://discuss.elastic.co/t/how-to-index-special-characters-and-search-those-special-characters-in-elasticsearch/42506
     * Escaping special characters that are part of the query syntax. The current list special characters are: + - && || ! ( ) { } [ ] ^ " ~ * ? : \
     * To escape these character use the \ before the character
     * @param inputString - string that might contain special characters that needs escaping
     */
    export function escapeMetaCharacters(inputString: string): string {
        const metaCharacters: string[] = [
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
}
