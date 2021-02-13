const { exec } = require("child_process");
const { promisify } = require("util");

const execPromise = promisify(exec);

const getBattery = async () => {
  const res = await execPromise("/usr/local/bin/headsetcontrol -b -c");
  if (res.stderr) {
    throw new Error("Error reading data");
  }

  const val = parseInt(res.stdout);

  if (isNaN(val)) {
    throw new Error(res.stdout);
  }

  return val;
};

module.exports = getBattery;
