import fs from 'fs';
import dotenv from 'dotenv';

/**
 * update e2e .env file with given value
 * In case of already existing key, it's values will be updated.
 * Otherwise, new key entry will be added
 * If no value provided but key only: {key:<key name>} to the function, existing key will be removed from the .env file
 * @param envEntry value to update in format of {key:<key name>, value:<key value>>}
 */
exports.updateEnvFile = (envEntry: Record<string, unknown>) => {
  console.log(`Updating .env file with data ${JSON.stringify(envEntry)}`);
  const fileName = '.env';

  if (!fs.existsSync(fileName)) {
    fs.writeFileSync(fileName, '', { flag: 'w+' }); //create .env file
  }

  const envFileContent = fs.readFileSync(fileName).toString();
  const reg = new RegExp('^' + envEntry.key + '=(.*)', 'gm');

  if (envEntry && !reg.test(envFileContent)) {
    console.log(`Adding new value: ${envEntry.key}=${envEntry.value}\n`);
    const newEnvValue = envFileContent.concat(`${envEntry.key}=${envEntry.value}\n`);
    fs.writeFileSync('.env', newEnvValue);
  } else if (!envEntry.value) {
    console.log(`Removing existing value: ${envEntry.key}\n`);
    const newEnvValue = envFileContent
      .split('\n')
      .filter(function (line) {
        return line.indexOf(<string>envEntry.key) == -1;
      })
      .join('\n');
    fs.writeFileSync('.env', newEnvValue);
  }
  dotenv.config();
};
