const SERVER_PORT = 5000;
const SERVER_URL = `http://localhost:${SERVER_PORT}/translate`; // Please update this to an active server address.

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.id) return;

  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"]
    });
    console.log("Content script injected into tab", tab.id);
  } catch (err) {
    console.error("Failed to inject content script:", err);
  }
});

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