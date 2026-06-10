const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function analyzeConversation(messages) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const chatText = messages
      .map((msg) => `[${msg.sender}] ${msg.message_text || msg.text}`)
      .join("\n");

    const prompt = `
You are an Etsy customer support analyst.

Analyze the conversation and return ONLY valid JSON.

{
  "sentiment": "Positive | Neutral | Negative",
  "priority_level": "LOW | MEDIUM | HIGH",
  "customer_intent": "",
  "ai_summary": "",
  "recommended_action": ""
}

Conversation:

${chatText}
`;

    const result = await model.generateContent(prompt);

    let response = result.response.text();

    response = response
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    const analysis = JSON.parse(response);

    return {
      sentiment: analysis.sentiment || "Unknown",
      priority_level: analysis.priority_level || "LOW",
      customer_intent: analysis.customer_intent || "Unknown",
      ai_summary: analysis.ai_summary || "",
      recommended_action: analysis.recommended_action || "Review manually",
    };
  } catch (error) {
    console.error("Gemini Error:", error);

    return {
      sentiment: "Unknown",
      priority_level: "LOW",
      customer_intent: "Unknown",
      ai_summary: "Analysis failed",
      recommended_action: "Review manually",
    };
  }
}

module.exports = {
  analyzeConversation,
};
