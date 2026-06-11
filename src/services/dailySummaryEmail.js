const sendEmail = require("./gmail");

async function sendDailySummaryEmail(rows) {
  const total = rows.length;

  const high = rows.filter(
    (r) => r.priority_level === "HIGH"
  ).length;

  const medium = rows.filter(
    (r) => r.priority_level === "MEDIUM"
  ).length;

  const low = rows.filter(
    (r) => r.priority_level === "LOW"
  ).length;

  const conversationsHtml = rows
    .map(
      (r) => `
      <tr>
        <td>${r.conversation_id}</td>
        <td>${r.priority_level}</td>
        <td>${r.sentiment}</td>
        <td>${r.customer_intent}</td>
      </tr>
    `
    )
    .join("");

  const html = `
    <h1>Etsy AI Daily Report</h1>

    <h3>Summary</h3>

    <ul>
      <li>Total Conversations: ${total}</li>
      <li>HIGH Priority: ${high}</li>
      <li>MEDIUM Priority: ${medium}</li>
      <li>LOW Priority: ${low}</li>
    </ul>

    <h3>Conversation Details</h3>

    <table border="1" cellpadding="8" cellspacing="0">
      <tr>
        <th>Conversation ID</th>
        <th>Priority</th>
        <th>Sentiment</th>
        <th>Intent</th>
      </tr>

      ${conversationsHtml}
    </table>
  `;

  await sendEmail(
    process.env.ALERT_EMAIL,
    "📊 Etsy Daily AI Report",
    html
  );

  console.log("Daily Summary Email Sent");
}

module.exports = {
  sendDailySummaryEmail,
};