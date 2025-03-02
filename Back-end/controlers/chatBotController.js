// Back-end\controlers\routeControlers.js
const dotenv = require('dotenv')
const { GoogleGenerativeAI } = require('@google/generative-ai');
const markdownToText = require('markdown-to-text').default; // Use .default to access the function


// Initialize the Gemini API client using the API key from the environment variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

dotenv.config()

// chatbot
const chatbotControler = async (req, res) => {
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

        if (countResult.totalTokens > 20) {
            return res.status(400).send('Token limit exceeded. Please modify your input.');
        }

        const result = await chat.sendMessage(message, { maxTokens: 20 }); // Limit response to 20 tokens
        const markdownResponse = result.response.text(); // Get the response in markdown
        const plainTextResponse = markdownToText(markdownResponse); // Convert markdown to plain text
        console.log(plainTextResponse); // Print the plain text response to the console
        res.send(plainTextResponse); // Send the plain text response back to the client
    } catch (error) {
        console.error('Error communicating with Gemini API:', error);
        res.status(500).send('Failed to get response from Gemini API');
    }
}


module.exports = {
    chatbotControler
}