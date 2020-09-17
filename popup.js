send_flag = (flag) => {
    chrome.tabs.query({}, function(tabs) {
        tabs.forEach(element => chrome.tabs.sendMessage(element.id, { flag: flag }));
    });
}

set_badge = (text, color) => {
    chrome.browserAction.setBadgeText({ text: text });
    chrome.browserAction.setBadgeBackgroundColor({ color: color });
}

power_on = () => {
    set_badge('ON', '#46f193');
    chrome.storage.local.set({ 'status': 'on' });
    send_flag('START');
}

set_mod_normal = () => {
    chrome.storage.local.set({ 'mode': 'normal' });
}

set_mod_beast = () => {
    chrome.storage.local.set({ 'mode': 'beast' });
}

power_off = () => {
    set_badge('OFF', '#ee6363');
    chrome.storage.local.set({ 'status': 'off' });
    send_flag('STOP');
}

document.querySelector('#on').addEventListener('click', power_on);
document.querySelector('#mod_normal').addEventListener('click', set_mod_normal);
document.querySelector('#mod_beast').addEventListener('click', set_mod_beast);
document.querySelector('#off').addEventListener('click', power_off);