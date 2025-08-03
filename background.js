chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "convert-metric",
    title: "Convert metric measurement...",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === "convert-metric") {
    // Save selected text to storage so popup can read it
    chrome.storage.local.set({ selectedText: info.selectionText }, () => {
      // Open popup window (fake browser action click)
      chrome.action.openPopup();
    });
  }
});
