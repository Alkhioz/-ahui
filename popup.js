power_on = () => {
    chrome.browserAction.setBadgeText({text: 'ON'});
    chrome.browserAction.setBadgeBackgroundColor({color: '#4688F1'});
    chrome.storage.local.set({'status': 'on'});
  }
set_mod_normal = () => {
        chrome.storage.local.set({'mode': 'normal'});
      }
set_mod_beast = () => {
        chrome.storage.local.set({'mode': 'beast'});
      }
power_off = () => {
        chrome.browserAction.setBadgeText({text: 'OFF'});
        chrome.browserAction.setBadgeBackgroundColor({color: '#ee6363'});
        chrome.storage.local.set({'status': 'off'});
      }      
document.querySelector('#on').addEventListener('click', power_on);      
document.querySelector('#mod_normal').addEventListener('click', set_mod_normal);
document.querySelector('#mod_beast').addEventListener('click', set_mod_beast);
document.querySelector('#off').addEventListener('click', power_off);
/*window.onload = function() {
    chrome.storage.local.get( null , function (result) {
        off_btn = document.querySelector('#off');
        if(result.status === 'on'){
            if (off_btn.className === "button enable") {
                off_btn.className += "button disable";
              }
        }
    });
};*/