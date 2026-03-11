chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    fetch("http://localhost:5000/translate", {
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