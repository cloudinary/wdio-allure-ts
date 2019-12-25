const https = require('https');

/**
 * Get selenium args with latest chrome driver version
 * @returns {Promise<unknown>}
 */
function getChromeDriverVersion() {
  return new Promise((resolve, reject) => {
    https
      .get('https://chromedriver.storage.googleapis.com/LATEST_RELEASE', resp => {
        let data = '';

        resp.on('data', chunk => {
          data += chunk;
        });

        resp.on('end', () => {
          resolve(data);
        });
      })
      .on('error', err => {
        reject(err);
      });
  });
}
exports.getSeleniumArgs = function() {
  return getChromeDriverVersion().then(chromeDriverVersion => {
    return {
      seleniumArgs: {
        drivers: {
          chrome: {
            version: chromeDriverVersion,
          },
        },
      },
      seleniumInstallArgs: {
        drivers: {
          chrome: {
            version: chromeDriverVersion,
          },
        },
      },
    };
  });
};
