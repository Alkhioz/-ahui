const targetNode = document.querySelector('body');
const config = { childList: true, subtree: true };

const observer = new MutationObserver(() => {
    chrome.storage.local.get('status', (result) => {
        if(result.status === 'off') return false;
        const classSelector = '[class*="ytp"][class*="skip"][class*="ad"][class*="button"]';
        const adButton = document.querySelector(classSelector);
        if (!adButton) return false;
        chrome.storage.local.get('mode', (result) => check_mode(result.mode, adButton));
    });
});

function check_mode(mode, object) {
    if (mode !== 'normal') {
        eventFire(object, 'click');
        return false;
    }
    const MIN_DELAY = 5000;
    const MAX_DELAY = 6000;
    const delay = Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY + 1) + MIN_DELAY);
    setTimeout(() => eventFire(object, 'click'), delay);
}

function eventFire(el, etype) {
    if (!el?.dispatchEvent) return false;
    let evObj = new Event(etype, { bubbles: true, cancelable: false });
    el.dispatchEvent(evObj);
}

const observer_start = () => observer.observe(targetNode, config);
const observer_stop = () => observer.disconnect();

chrome.runtime.onMessage.addListener((request) => {
    if (request.flag === 'START') observer_start();
    else if (request.flag === 'STOP') observer_stop();
});

observer_start();