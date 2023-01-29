//  received data form backgournd script
chrome.runtime.onMessage.addListener(async function (
    data,
    sender,
    sendResponse
) {
    if (!data) {
        return
    }

    if (data.type === "getSiteURL") {
        sendResponse({...data, response: location.href})


    } else {
        try {
            let candidateData = JSON.parse(data.payload)
            fillUp(candidateData)

            sendResponse({type: "data_full_up_success", message: "Done"})

        } catch (ex) {
          sendResponse({type: "error", message: ex.message})
        }
    }
})

// fill up all input function
function fillUp(data) {
    for (let key in data) {
        let elem = document.getElementById(key)
        if (elem && data[key]) {
            elem.value = data[key]
        }
    }
}
