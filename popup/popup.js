
function getUserTime() {
    chrome.storage.local.get(["userTime"]).then((result) => {
        timeSeconds = (result.userTime/1000) % 60
        timeMinutes = Math.floor((result.userTime/1000) / 60)
        document.getElementById("user-time").innerHTML = "User time: " + ("0" + timeMinutes).slice(-2) + ":" + ("0" + timeSeconds).slice(-2)
    });
}

function setUserTime() {

    timeMinutes = parseInt(document.getElementById("cd-mm").value) * 60 * 1000
    timeSeconds = parseInt(document.getElementById("cd-ss").value) * 1000

    time = timeMinutes + timeSeconds

    chrome.storage.local.set({ "userTime": time }).then(() => {

        getUserTime()

    });

}

function updateCdTime(remainingTime) {

    timeSeconds = Math.ceil(remainingTime / 1000) % 60
    timeMinutes = Math.floor(Math.ceil(remainingTime / 1000) / 60)

    document.getElementById("current-time").innerHTML = "Current time: " + ("0" + timeMinutes).slice(-2) + ":" + ("0" + timeSeconds).slice(-2)
        
};

function startCountdown() {

    chrome.storage.local.get(["timeCdEnd"]).then((result) => {

        updateCdTime(Math.max(0, result.timeCdEnd - Date.now()))

    })

    countdown = setInterval(() => {

        chrome.storage.local.get(["timeCdEnd"]).then((result) => {

            remainingTime = Math.max(0, result.timeCdEnd - Date.now())

            updateCdTime(remainingTime)

        })


    }, 1000);

}

startCountdown()
getUserTime()

document.getElementById("cd-button").addEventListener("click", setUserTime)

