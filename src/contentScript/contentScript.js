

chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
    
      console.log(message);
      
      sendResponse("I got message")

    }
  );
