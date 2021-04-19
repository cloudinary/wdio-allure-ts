const { getChromeDriverVersion } = require('./GetChromeDriverVersion');
const { join } = require('path');
const fs = require('fs');

const envPath = join(process.cwd(), '.env');
const driverVersion = getChromeDriverVersion();
const chromeDriverVersion = 'CHROME_DRIVER_VERSION';
/**
 * Function updates env file with latest version of chromeDriver
 */
(() => {
  if (!fs.existsSync(envPath)) {
    return fs.writeFileSync(envPath, driverVersion);
  }
  const file = fs.readFileSync(envPath, 'utf-8');
  if (file.includes(chromeDriverVersion)) {
    const replacedVersion = file.replace(`/[^${chromeDriverVersion}=]+/`, driverVersion);
    return fs.writeFileSync(envPath, replacedVersion);
  }
  return fs.appendFileSync(envPath, `${chromeDriverVersion}=${driverVersion}`);
})();
