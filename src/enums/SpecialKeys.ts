/**
 * Enum for special keys
 * will be added more by demand according to https://w3c.github.io/webdriver/webdriver-spec.html#keyboard-actions
 */
export enum SpecialKeys {
    ENTER = '\uE007',
    ARROW_LEFT = '\uE012',
    ARROW_RIGHT = '\uE014',
    ARROW_UP = '\uE013',
    ARROW_DOWN = '\uE015',
    TAB = '\uE004',
    ESCAPE = '\uE00C',
    EMOJI_HEART = '\u2766', //In The BMP (basic multilingual plane)
    EMOJI_POOP = '\uD83D\uDCA9', //Above The BMP bug in chrome prevents us from using it
    HTML_NON_BREAKING_SPACE = '&nbsp;',
}
