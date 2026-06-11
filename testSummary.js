
require("dotenv").config();

const {
  generateDailySummary,
} = require("./src/services/dailySummary");

async function run() {
  try {
    const rows = await generateDailySummary();

    console.log("TODAY'S ANALYSIS");
    console.log(rows);
  } catch (err) {
    console.error(err);
  }

  process.exit();
}

run();