const schedule = require("node-schedule");

schedule.scheduleJob("*/15 * * * *", () => {
  console.log("Testing, testing...");
});
