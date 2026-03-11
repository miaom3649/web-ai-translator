const SERVER_PORT = 5000;
const SERVER_URL = `http://localhost:${SERVER_PORT}/translate`;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    fetch(SERVER_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            text: message.text
        })
    })
    .then(res => res.json())
    .then(data => {
        sendResponse({ translatedText: data.translatedText });
    })
    .catch(err => {
        console.error(err);
        sendResponse({ translatedText: message.text });
    });

    return true;
});