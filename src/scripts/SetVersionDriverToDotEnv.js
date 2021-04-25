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
    fs.writeFileSync(envPath, driverVersion);
    return;
  }
  const file = fs.readFileSync(envPath, 'utf-8');
  if (file.includes(chromeDriverVersion)) {
    const replacedVersion = file.replace(`/[^${chromeDriverVersion}=]+/`, driverVersion);
    fs.writeFileSync(envPath, replacedVersion);
    return;
  }
  fs.appendFileSync(envPath, `${chromeDriverVersion}=${driverVersion}`);
})();
