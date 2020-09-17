const targetNode = document.querySelector('#movie_player');

const config = { childList: true, subtree: true };
const callback = (mutationsList, observer) => {
    chrome.storage.local.get(null, function(result) {
        if (result.status === 'off') return;
        if (!document.getElementsByClassName("ytp-ad-skip-button ytp-button")[0]) return;
        let adbutton = document.getElementsByClassName("ytp-ad-skip-button ytp-button")[0];
        check_mode(result.mode, adbutton);
    });
};

const observer = new MutationObserver(callback);

check_mode = (mode, object) => {
    if (mode === 'normal') {
        setTimeout(() => {
            eventFire(object, 'click');
        }, 5000);
        return 0;
    }
    eventFire(object, 'click');
}

atach_event = (el, etype) => {
    let evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
}

eventFire = (el, etype) => {
    if (!el.fireEvent) {
        atach_event(el, etype);
        return;
    }
    el.fireEvent('on' + etype);
}

observer_start = () => {
    observer.observe(targetNode, config);
}
observer_stop = () => {
    observer.disconnect();
}

observer_auto_start = () => {
    chrome.storage.local.get(null, function(result) {
        if (result.status === 'off') return;
        observer.observe(targetNode, config);
    });
}

observer_auto_start();

chrome.runtime.onMessage.addListener(
    (request) => {
        if (request.flag === 'START') {
            observer_start();
        }
        if (request.flag === 'STOP') {
            observer_stop();
        }
    });