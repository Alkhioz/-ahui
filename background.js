chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({ text: 'ON' });
    chrome.action.setBadgeBackgroundColor({ color: '#46f193' });
    chrome.storage.local.set({ status: 'on' });
    chrome.storage.local.set({ mode: 'normal' });
});