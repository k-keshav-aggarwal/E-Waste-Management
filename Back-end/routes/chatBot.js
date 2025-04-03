const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const markdownToText = require('markdown-to-text').default;
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY || process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

router.post("/", async (req, res) => {
  const general = "just give in 2 lines";
  const message = req.body.message || "what is javascript";
  try {
    const chat = model.startChat({
      history: [
        { role: 'user', parts: [{ text: message + general }] },
      ],
    });

    const countResult = await model.countTokens({
      generateContentRequest: { contents: await chat.getHistory() },
    });

    if (countResult.totalTokens > 100) {
      return res.status(400).send('Token limit exceeded. Please modify your input.');
    }

    const result = await chat.sendMessage(message, { maxTokens: 100 });
    const markdownResponse = result.response.text();
    const plainTextResponse = markdownToText(markdownResponse);
    console.log('Bot response:', plainTextResponse);
    res.send(plainTextResponse);
  } catch (error) {
    console.error('Error communicating with Gemini API:', error);
    res.status(500).send('Failed to get response from Gemini API');
  }
});

module.exports = router;
