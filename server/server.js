require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const aiClient = require("./ai_client");

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(cors({
  origin: "*",
  methods: ["GET","POST"],
  allowedHeaders: ["Content-Type","Authorization"]
}));

// Handle translation request
app.post("/translate", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "No text provided" });
    }

    // Transfer the message to an AI client
    const translatedText = await aiClient.translateText(text);
    res.json({ translatedText });
  } catch (err) {
    console.error("Error in /translate:", err);
    res.json({ translatedText: req.body.text });
  }
});

// Launch the server
app.listen(PORT, () => {
  console.log(`AI Proxy Server running on port ${PORT}`);
});