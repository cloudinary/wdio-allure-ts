const axios = require('axios');

/**
 *   Getting chrome version driver from google
 *   by default will return latest version
 *   @param  driverVersion should be provided version of driver for example 90.0.4430 or 89.0.4389
 */
const getChromeDriverVersion = async (driverVersion) => {
  const url = driverVersion
    ? `https://chromedriver.storage.googleapis.com/LATEST_RELEASE_${driverVersion}`
    : 'https://chromedriver.storage.googleapis.com/LATEST_RELEASE';
  const res = (await axios.get(url)).data;

  console.log('Getting chrome driver version', res);
  return res;
};

module.exports.getChromeDriverVersion = getChromeDriverVersion;
