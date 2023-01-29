chrome.runtime.onMessage.addListener(async (data, sender, sendResponse) => {
  if (data.type === "candidateData") {
  
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });

    const response = await chrome.tabs.sendMessage(tab.id, data);

    // do something with response here, not outside the function
    console.log(response);  

    
  }
});
