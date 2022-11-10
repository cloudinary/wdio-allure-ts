#!/usr/bin/env node
const { join } = require('path');
const fs = require('fs');
const { getChromeDriverVersion } = require('./GetChromeDriverVersion');

const envPath = join(process.cwd(), '.env');
const chromeDriverVersion = 'CHROME_DRIVER_VERSION';
/**
 * Function updates env file with latest version of chromeDriver
 */
void (async () => {
  const driverVersion = await getChromeDriverVersion();

  if (!fs.existsSync(envPath)) {
    fs.writeFileSync(envPath, `${chromeDriverVersion}=${driverVersion}`);
    return;
  }
  const file = fs.readFileSync(envPath, 'utf-8');
  if (file.includes(chromeDriverVersion)) {
    const replacedVersion = file.replace(/^CHROME_DRIVER_VERSION=.*$/m, `${chromeDriverVersion}=${driverVersion}`);
    fs.writeFileSync(envPath, replacedVersion);
    return;
  }
  fs.appendFileSync(envPath, `${chromeDriverVersion}=${driverVersion}`);
})();
