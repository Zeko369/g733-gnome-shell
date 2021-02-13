const { readFileSync, writeFileSync } = require("fs");
const cronPath = `/var/spool/cron/${process.env.USER}`;

const cron = readFileSync(cronPath, "utf-8");

const lines = cron.split("\n");
const line = lines.find((a) => a.includes("g733/app"));

const entry = `* * * * * ${__dirname}/app`;
let out = "";

if (line) {
  if (line.startsWith("* * * * *")) {
    console.log("already installed");
    process.exit(0);
  } else {
    console.log("installed but with wrong schedule");
    out = lines
      .map((a) => {
        if (a === line) {
          return entry;
        }

        return a;
      })
      .join("\n");
  }
} else {
  out = cron + "\n# Headset battery notifications" + entry;
}

writeFileSync(cronPath, out);

console.log("Done");
