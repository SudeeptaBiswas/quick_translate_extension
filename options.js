// Language syncs with the browser account; the key stays on this PC only.
var languageBox = document.getElementById("targetLanguage");
var keyBox = document.getElementById("thesaurusKey");
var statusBox = document.getElementById("status");
var thesaurusBox = document.getElementById("thesaurusEnabled");

chrome.storage.sync.get({targetLanguage: "bn", thesaurusEnabled: true}, function(items) {
  languageBox.value = items.targetLanguage;
  thesaurusBox.checked = items.thesaurusEnabled;
});
chrome.storage.local.get({thesaurusKey: ""}, function(items) {
  keyBox.value = items.thesaurusKey;
});

document.getElementById("save").addEventListener("click", function() {
  chrome.storage.sync.set({targetLanguage: languageBox.value, thesaurusEnabled: thesaurusBox.checked}, function() {
    chrome.storage.local.set({thesaurusKey: keyBox.value.trim()}, function() {
      statusBox.textContent = "Saved.";
      setTimeout(function() { statusBox.textContent = ""; }, 2000);
    });
  });
});
