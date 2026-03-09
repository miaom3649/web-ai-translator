chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer API-KEY"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "Translate the following text to Chinese" },
                { role: "user", content: message.text }
            ]
        })
    })
    .then(res => res.json())
    .then(data => {
        sendResponse({ translatedText: data.choices[0].message.content });
    })
    .catch(err => {
        console.error(err);
        sendResponse({ translatedText: message.text });
    });

    return true;
});