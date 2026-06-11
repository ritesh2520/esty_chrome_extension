const sendEmail = require("./gmail");

async function sendPriorityAlert(data) {
  const { conversationId, analysis } = data;

  const subject = `🚨 ${analysis.priority_level} Priority Etsy Alert`;

  const html = `
    <h2>Etsy AI Alert</h2>

    <p><b>Conversation:</b> ${conversationId}</p>

    <p><b>Priority:</b>
    ${analysis.priority_level}</p>

    <p><b>Sentiment:</b>
    ${analysis.sentiment}</p>

    <p><b>Intent:</b>
    ${analysis.customer_intent}</p>

    <p><b>Summary:</b><br>
    ${analysis.ai_summary}</p>

    <p><b>Recommended Action:</b><br>
    ${analysis.recommended_action}</p>
  `;

  await sendEmail(process.env.ALERT_EMAIL, subject, html);
}

module.exports = {
  sendPriorityAlert,
};
