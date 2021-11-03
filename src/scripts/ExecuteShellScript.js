const exec = require("child_process").exec;

/**
 * Executing any cmd script
 * @param cmd script for execution
 */
async function execShellCommand(cmd) {
  return new Promise((resolve) => {
    exec(cmd, { maxBuffer: 1024 * 500 }, (error, stdout, stderr) => {
      if (error) {
        throw new Error(JSON.stringify(error));
      }
      if (stderr) {
        throw new Error(JSON.stringify(stderr));
      }
      resolve(stdout);
    });
  });
}

module.exports.executeShellScript = execShellCommand;
