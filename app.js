const { notify } = require("node-notifier");
const getBattery = require("./lib/g733");

(async () => {
  try {
    const percentage = await getBattery();
    console.log(`G733: ${percentage}%`);
  } catch (err) {
    console.log(`G733: err`);
  }

  // if (percentage < 90) {
  //   notify({
  //     title: "Headset battery",
  //     message: "G733 battery dropped below 90%",
  //   });
  // }
})();
