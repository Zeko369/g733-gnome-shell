const { exec } = require("child_process");
const { notify } = require("node-notifier");
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

(async () => {
  const percentage = await getBattery();

  if (percentage < 90) {
    notify({
      title: "Headset battery",
      message: "G733 battery dropped below 90%",
    });
  }
})();
