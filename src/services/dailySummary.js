const pool = require("../db/db");

async function getTodaySummary() {
  const [rows] = await pool.execute(`
    SELECT
      priority_level,
      sentiment,
      customer_intent,
      ai_summary,
      conversation_id,
      created_at
    FROM ai_analysis
    WHERE DATE(created_at) = CURDATE()
    ORDER BY created_at DESC
  `);

  return rows;
}

module.exports = {
  getTodaySummary,
};
