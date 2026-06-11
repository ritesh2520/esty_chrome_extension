require("dotenv").config();

const {
  generateDailySummary,
} = require("./src/services/dailySummary");

const {
  sendDailySummaryEmail,
} = require("./src/services/dailySummaryEmail");

async function run() {
  const rows = await generateDailySummary();

  await sendDailySummaryEmail(rows);

  console.log("DONE");
}

run();