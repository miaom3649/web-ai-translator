// Transfer request
async function translateText(text) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    const apiUrl = process.env.AI_API_URL;
    const model = process.env.MODEL_NAME;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: "system", content: "Translate the following text to Chinese. Direct Translation. No additional information. As smooth and genuine as possible." },
          { role: "user", content: text }
        ]
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;

  } catch (err) {
    // Original text is returned if failed
    console.error("Error in ai_client:", err);
    return text;
  }
}

module.exports = { translateText };