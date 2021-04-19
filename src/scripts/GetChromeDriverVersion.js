// eslint-disable-next-line @typescript-eslint/no-var-requires
const request = require('sync-request');

/*
Getting chrome version driver from google
*/
const getChromeDriverVersion = () => {
  const res = request('GET', 'https://chromedriver.storage.googleapis.com/LATEST_RELEASE');
  console.log('Getting chrome driver version', res.getBody().toString());
  return res.getBody().toString();
};

module.exports.getChromeDriverVersion = getChromeDriverVersion;
