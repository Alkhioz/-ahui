console.log("Background running");
chrome.runtime.onInstalled.addListener( () => {
  chrome.browserAction.setBadgeText({text: 'ON'});
  chrome.browserAction.setBadgeBackgroundColor({color: '#4688F1'});
  chrome.storage.local.set({'status': 'on', 'mode':'normal'});
});

function executeScriptsInExistingTabs(){
    chrome.windows.getAll(null, function(wins) {
      for (var j = 0; j < wins.length; ++j) {
        chrome.tabs.getAllInWindow(wins[j].id, function(tabs) {
          for (var i = 0; i < tabs.length; ++i) {
            if (tabs[i].url.indexOf("chrome://") != 0) {
              chrome.tabs.executeScript(tabs[i].id, { file: 'content.js' });
            }
          }
        });
       }
     });
   }