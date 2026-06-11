require("dotenv").config();

const { sendPriorityAlert } = require("./src/services/alertEmail");

async function run() {
  await sendPriorityAlert({
    conversationId: "TEST-123",
    analysis: {
      priority_level: "HIGH",
      sentiment: "Negative",
      customer_intent: "Refund Request",
      ai_summary: "Customer wants a refund.",
      recommended_action: "Contact customer immediately.",
    },
  });

  console.log("TEST COMPLETE");
}

run();