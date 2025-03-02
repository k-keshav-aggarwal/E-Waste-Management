// Back-end\routes\routeHandlers.js
const express = require('express');
const { chatbotControler } = require('../controlers/chatBotController');

const router = express.Router();

// Chatbot API endpoint
router.post('/chat-bot', chatbotControler);

module.exports = router;