require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const markdownToText = require('markdown-to-text').default; // Use .default to access the function
const cors = require('cors'); // Add CORS middleware
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize the Gemini API client using the API key from the environment variable
const genAI = new GoogleGenerativeAI(process.env.API_KEY || process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors()); // Enable CORS

// Serve static files (CSS, JS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Chatbot API endpoint
app.post('/chat-bot', async (req, res) => {
  const general = "just give in 2 lines";
  const message = req.body.message || "what is javascript"; // Get the message from the request body

  try {
    // Start a new chat and send the message
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: message + general }],
        },
      ],
    });

    // Count tokens before sending the message
    const countResult = await model.countTokens({
      generateContentRequest: { contents: await chat.getHistory() },
    });

    if (countResult.totalTokens > 100) { // Increased token limit for testing
      return res.status(400).send('Token limit exceeded. Please modify your input.');
    }

    const result = await chat.sendMessage(message, { maxTokens: 100 }); // Increased token limit for testing
    const markdownResponse = result.response.text(); // Get the response in markdown
    const plainTextResponse = markdownToText(markdownResponse); // Convert markdown to plain text
    console.log('Bot response:', plainTextResponse); // Print the plain text response to the console
    res.send(plainTextResponse); // Send the plain text response back to the client
  } catch (error) {
    console.error('Error communicating with Gemini API:', error);
    res.status(500).send('Failed to get response from Gemini API');
  }
});

//router and connection pool import
const { pool } = require("./db/connection.js");
const { collectionCenterRouter, recyclingCenterRouter, shopRouter } = require("./routes/index.js");

// Routes
app.use("/collection_centers", collectionCenterRouter);
app.use("/recycling_centers", recyclingCenterRouter);
app.use("/shop", shopRouter);

// Handle both SIGINT (Ctrl + C) and SIGTERM (server shutdown)
const closeConnection = async () => {
    console.log("Closing PostgreSQL connection...");
    await pool.end();
    console.log("PostgreSQL connection closed.");
    process.exit(0);
};

process.on("SIGINT", closeConnection);
process.on("SIGTERM", closeConnection);

//error handling
import { errorHandler } from "./utils/errorHandler.js"
app.use(errorHandler)

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
