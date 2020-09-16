console.log("Background running");

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