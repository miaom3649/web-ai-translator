// Traverse the web DOM tree
function walk(node) {
    let child = node.firstChild;
    while (child) {
        if (child.nodeType === Node.TEXT_NODE && child.nodeValue.trim() !== "") {
            translateText(child);
        } else if (child.nodeType === Node.ELEMENT_NODE && child.tagName !== "SCRIPT" && child.tagName !== "STYLE") {
            walk(child);
        }
        child = child.nextSibling;
    }
}

// Call the background for AI translation
function translateText(textNode) {
    chrome.runtime.sendMessage({ text: textNode.nodeValue }, function(response) {
        textNode.nodeValue = response.translatedText;
    });
}

walk(document.body);