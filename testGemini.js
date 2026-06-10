require("dotenv").config();


const {
  analyzeConversation,
} = require("./src/services/gemini");

async function run() {
  const messages = [
    {
      sender: "user",
      text: "I cannot find my Etsy order",
    },
    {
      sender: "etsy_support",
      text: "Did you purchase as a guest?",
    },
    {
      sender: "user",
      text: "No",
    },
  ];

  const result =
    await analyzeConversation(messages);

  console.log(result);
}

run();