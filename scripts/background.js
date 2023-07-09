chrome.runtime.onInstalled.addListener(function (details) {
    chrome.storage.local.set({ "userTime": 300000 })
    chrome.storage.local.set({ "timeCdEnd": 0 })
});