const { notify } = require("node-notifier");
const getBattery = require("./lib/g733");

(async () => {
  const percentage = await getBattery();

  if (percentage < 90) {
    notify({
      title: "Headset battery",
      message: "G733 battery dropped below 90%",
    });
  }
})();
