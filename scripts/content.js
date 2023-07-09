var isDisabled = false

function disablePlay() {

    var d = document.querySelectorAll('[data-cy="new-game-index-play"], ' +
        '[data-cy="sidebar-game-over-new-game-button"], ' +
        '[data-cy="sidebar-game-over-rematch-button"], ' +
        '[data-cy="game-over-modal-new-game-button"], ' +
        '[data-cy="game-over-modal-rematch-button"], ' +
        '[data-cy="game-review-new-game-btn"]')

    for (let i = 0; i < d.length; i++) {
        d[i].disabled = true
    }

    isDisabled = true

}

function ablePlay() {

    var d = document.querySelectorAll('[data-cy="new-game-index-play"], ' +
        '[data-cy="sidebar-game-over-new-game-button"], ' +
        '[data-cy="sidebar-game-over-rematch-button"], ' +
        '[data-cy="game-over-modal-new-game-button"], ' +
        '[data-cy="game-over-modal-rematch-button"] ' +
        '[data-cy="game-review-new-game-btn"]')

    for (let i = 0; i < d.length; i++) {
        d[i].disabled = false
    }

    isDisabled = false

}

function startCd() {

    disablePlay()

    chrome.storage.local.get(["userTime"]).then((result) => {
        chrome.storage.local.set({ "timeCdEnd": Math.ceil(Date.now()/1000)*1000 + result.userTime })
    });

}

loop = setInterval(() => {

    chrome.storage.local.get(["timeCdEnd"]).then((result) => {

        remainingTime = Math.max(0, result.timeCdEnd - Date.now())

        if (isDisabled & remainingTime <= 0) {
            ablePlay()
        }
        else if (remainingTime > 0) {
            disablePlay()
        }

    })

}, 1000);

targetNode = document.getElementById("board-layout-chessboard")
const config = { childList: true, subtree: true };

const callback = (mutationList, observer) => {
    console.log('object :>> ', mutationList, observer);
    for (const mutation of mutationList) {
        if (mutation.type === "childList") {
            console.log(mutation)
            for (let i = 0; i < mutation.addedNodes.length; i++) {
                if (typeof mutation.addedNodes[i].className == 'string') {
                    if (mutation.addedNodes[i].className.includes("game-over-modal-appear")) {
                        startCd()
                    }
                }
            }
        }
    }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);