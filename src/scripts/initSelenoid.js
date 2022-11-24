/* eslint-disable @typescript-eslint/no-var-requires*/
require('dotenv').config();
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

/**
 * initialize selenoid configuration
 */
(() => {
  //SPECIFIC_CHROME_VERSION - in case we want to run with a specific chrome version for example '96.0'
  const chromeVersion = process.env.SPECIFIC_CHROME_VERSION || getLatestSelenoidChromeImage();

  console.log(`initialize selenoid config with chrome ${chromeVersion}`);
  pullChromeImage(chromeVersion);
  initBrowserConfig(chromeVersion);
  console.log('Selenoid configured successfully');
})();

/**
 * initialize selenoid browser config to chrome
 * @param version chrome browser version
 */
function initBrowserConfig(version) {
  let bc = {
    chrome: {
      default: 'latest',
      versions: {
        latest: {
          image: `selenoid/chrome:${version}`,
          port: '4444',
          path: '/',
        },
      },
    },
  };

  fs.writeFileSync(path.join(__dirname, '../../', 'browsers.json'), JSON.stringify(bc));
}

/**
 * pull selenoid chrome container
 * @param version chrome browser version
 */
function pullChromeImage(version) {
  const chromeImage = `selenoid/chrome:${version}`;
  console.log(`pulling ${chromeImage} image`);
  console.log(execSync(`docker pull ${chromeImage}`).toString());
}

/**
 * return the most updated selenoid chrome image.
 * https://hub.docker.com/r/selenoid/chrome/tags
 * @returns string - latest tag
 */
function getLatestSelenoidChromeImage() {
  console.log('Getting latest selenoid chrome image tag');
  const url = 'https://hub.docker.com/v2/repositories/selenoid/chrome/tags/?page_size=1&page=1&ordering=last_updated';
  const buffer = execSync(`curl ${url}`);
  const data = JSON.parse(buffer.toString('utf8'));
  console.log(`Latest selenoid chrome tag ${data.results[0].name}`);
  return data.results[0].name;
}
