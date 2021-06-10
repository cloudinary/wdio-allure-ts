const { executeShellScript } = require("./ExecuteShellScript");

/**
 * Detection chrome version on Mac
 */
async function detectChromeOnMac() {
  const chromeVersion = await executeShellScript(
    "/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome --version"
  );
  return chromeVersion.toString().replace("Google Chrome", "").split(" ").join("");
}

/**
 * Getting custom chrome driver according to installed Chrome version
 * For getting custom chrome driver from Mac machine need to remove all numbers after last dot
 */
async function getCustomChromeDriver() {
  const chromeDriver = await detectChromeOnMac();
  return chromeDriver.substr(0, chromeDriver.lastIndexOf("."));
}

module.exports.getCustomVersionChromeDriver = getCustomChromeDriver;
