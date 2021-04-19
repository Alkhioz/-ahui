send_flag = (flag) => {
    chrome.tabs.query({}, function(tabs) {
        tabs.forEach(element => chrome.tabs.sendMessage(element.id, { flag: flag }));
    });
}

set_badge = (text, color) => {
    chrome.browserAction.setBadgeText({ text: text });
    chrome.browserAction.setBadgeBackgroundColor({ color: color });
}

buttonServiceHandler = () => {
    chrome.storage.local.get('status',(response)=>{
        let status = response.status;
        if(status === "on"){
            power_off();
        }else if(status === "off"){
            power_on();
            set_mod_normal();
        }
    });
}

buttonBeastHandler = () => {
    chrome.storage.local.get('mode',(response)=>{
        let status = response.mode;
        if(status === "normal"){
            set_mod_beast();
        }else if(status === "beast"){
            set_mod_normal();
        }
    });
}

power_on = () => {
    set_badge('ON', '#46f193');
    chrome.storage.local.set({ 'status': 'on' });
    send_flag('START');
    let beastButton = document.querySelector("#beast");
    beastButton.disabled = false;
}

set_mod_normal = () => {
    set_badge('ON', '#46f193');
    chrome.storage.local.set({ 'mode': 'normal' });
}

set_mod_beast = () => {
    set_badge('BM', '#6a4cec');
    chrome.storage.local.set({ 'mode': 'beast' });
}

power_off = () => {
    set_badge('OFF', '#ee6363');
    chrome.storage.local.set({ 'status': 'off' });
    send_flag('STOP');
    let beastButton = document.querySelector("#beast");
    beastButton.checked = false;
    beastButton.disabled = true;
}

close_ = () => {
    window.close();
}

document.querySelector('#close').addEventListener('click', close_);
document.querySelector('#on').addEventListener('click', buttonServiceHandler);
document.querySelector('#beast').addEventListener('click', buttonBeastHandler);
document.addEventListener('DOMContentLoaded', ()=>{
    chrome.storage.local.get(['status', 'mode'],(response)=>{
        let status = response.status;
        if (status === "off"){
            let statusButton = document.querySelector('#on');
            statusButton.checked = false;
            let beastButton = document.querySelector("#beast");
            beastButton.disabled = true;
        }
        let mode = response.mode;
        if(mode === "beast"){
            let beastButton = document.querySelector("#beast");
            beastButton.checked = true;
        }
    });
});