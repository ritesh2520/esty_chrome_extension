require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./src/db/db");
const { analyzeConversation } = require("./src/services/gemini");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: true,
    message: "Etsy AI Monitor is running",
  });
});

app.post("/api/conversations", async (req, res) => {
  try {
    console.log("\n==============================");
    console.log("NEW CONVERSATION UPDATE");
    console.log("==============================");

    const { conversationId, source, url, capturedAt, totalMessages, messages } =
      req.body;

    if (!conversationId) {
      return res.status(400).json({
        success: false,
        message: "conversationId missing",
      });
    }

    // ==========================
    // SAVE CONVERSATION
    // ==========================

    await pool.execute(
      `
      INSERT INTO conversations
      (
        conversation_id,
        source,
        url,
        total_messages,
        captured_at
      )
      VALUES (?, ?, ?, ?, ?)

      ON DUPLICATE KEY UPDATE
        total_messages = VALUES(total_messages),
        captured_at = VALUES(captured_at)
      `,
      [conversationId, source, url, totalMessages, new Date(capturedAt)],
    );

    // ==========================
    // SAVE MESSAGES
    // ==========================

    for (const msg of messages) {
      await pool.execute(
        `
        INSERT IGNORE INTO messages
        (
          conversation_id,
          sender,
          message_time,
          message_text
        )
        VALUES (?, ?, ?, ?)
        `,
        [conversationId, msg.sender, msg.time, msg.text],
      );
    }

    console.log(`Conversation ${conversationId} saved`);
    console.log(`Messages received: ${messages.length}`);

    // ==========================
    // AI ANALYSIS
    // ==========================

    const conversationText = messages
      .map((m) => `${m.sender}: ${m.text}`)
      .join("\n");

    console.log("Running AI Analysis...");

    const analysis = await analyzeConversation(messages);

    console.log("AI Result:", analysis);

    // ==========================
    // SAVE AI ANALYSIS
    // ==========================

    await pool.execute(
      `
      INSERT INTO ai_analysis
      (
        conversation_id,
        sentiment,
        priority_level,
        customer_intent,
        ai_summary,
        recommended_action
      )
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        conversationId,
        analysis.sentiment,
        analysis.priority_level,
        analysis.customer_intent,
        analysis.ai_summary,
        analysis.recommended_action,
      ],
    );

    console.log("AI Analysis Saved");

    res.json({
      success: true,
      receivedAt: new Date().toISOString(),
      conversationId,
      analysis,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

app.listen(8999, () => {
  console.log(`Server running on ${process.env.PORT || 8999}`);
});
