const exec = require("child_process").exec;

function execShellCommand(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, { maxBuffer: 1024 * 500 }, (error, stdout, stderr) => {
      if (error) {
        throw new Error(JSON.stringify(error));
      } else if (stdout) {
      } else {
        throw new Error(JSON.stringify(stderr));
      }
      resolve(stdout);
    });
  });
}

async function detectChromeDriverOnMac() {
  const chromeVersion = await execShellCommand(
    "/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome --version"
  );
  console.log("chrome--->", chromeVersion.toString());
  //TODO: need to cut all after the last point
  // getChromeDriverVersion(chromeVersion.substring(0, chromeVersion.length - 3));
}

detectChromeDriverOnMac();
