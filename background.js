chrome.action.onClicked.addListener(function(tab) {
  chrome.scripting.executeScript({target: {tabId: tab.id}, files: ["google.js"]});
});

// Thesaurus lookup runs here: Manifest V3 does not allow loading remote scripts in the page.
// The key is set on the Options page and kept in chrome.storage.local (never in the code).
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.type !== "thesaurus") {
    return;
  }
  chrome.storage.local.get({thesaurusKey: ""}, function(items) {
    if (!items.thesaurusKey) {
      sendResponse({error: "noKey"});
      return;
    }
    var url = "https://thesaurus.altervista.org/service.php?word=" + encodeURIComponent(message.word) +
      "&language=en_US&output=json&key=" + encodeURIComponent(items.thesaurusKey);
    fetch(url)
      .then(function(response) { return response.json(); })
      .then(function(result) { sendResponse(result); })
      .catch(function() { sendResponse(null); });
  });
  return true; // keep the channel open for the async reply
});
