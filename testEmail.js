require("dotenv").config();

const sendEmail = require("./src/services/gmail");

async function run() {
  try {
    await sendEmail(
      process.env.ALERT_EMAIL,
      "Etsy AI Test",
      "<h2>Email system working</h2>"
    );

    console.log("SUCCESS");
  } catch (err) {
    console.error(err);
  }
}

run();  