console.log("Background running");
chrome.runtime.onInstalled.addListener(() => {
    chrome.browserAction.setBadgeText({ text: 'ON' });
    chrome.browserAction.setBadgeBackgroundColor({ color: '#46f193' });
    chrome.storage.local.set({ 'status': 'on' });
    chrome.storage.local.set({ 'mode': 'normal' });
});