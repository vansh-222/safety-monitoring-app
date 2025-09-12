// routes/Chat.js
const express = require("express");
const OpenAI = require("openai");

const router = express.Router();

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// POST /api/chat
router.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }],
    });

    const reply = response.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error(
      "❌ Chatbot error:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: "Chatbot failed to respond" });
  }
});

module.exports = router;

