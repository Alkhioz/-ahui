const targetNode = document.querySelector('body') || document.body;
const config = { childList: true, subtree: true };

const observer = new MutationObserver(() => {
    chrome.storage.local.get(["status"]).then((result) => {
        if(result.status === 'off') return;
        const classSelector = '[class*="ytp"][class*="skip"][class*="ad"][class*="button"]';
        const adButton = document.querySelector(classSelector);
        if (!adButton) return;
        chrome.storage.local.get(["mode"]).then((result) => {
            check_mode(result.mode, adButton)
        })
    })
});

function check_mode(mode, object) {
    console.log("mode", mode);
    console.log("object", object);
    if (mode !== 'normal') {
        eventFire(object, 'click');
        return;
    }
    const MIN_DELAY = 5000;
    const MAX_DELAY = 6000;
    const delay = Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY + 1) + MIN_DELAY);
    setTimeout(() => eventFire(object, 'click'), delay);
}

function eventFire(el, etype) {
    if (!el?.dispatchEvent) return;
    let evObj = new MouseEvent(etype, { bubbles: true, cancelable: true });
    el.dispatchEvent(evObj);
}

const observer_start = () => {
    observer.observe(targetNode, config);
}
const observer_stop = () => observer.disconnect();

chrome.runtime.onMessage.addListener((message) => {
    if (message.flag === 'START') observer_start();
    else if (message.flag === 'STOP') observer_stop();
});

observer_start();