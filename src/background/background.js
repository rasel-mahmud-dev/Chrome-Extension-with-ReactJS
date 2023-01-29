// chrome.runtime.onInstalled.addListener(function(details){
//   // This gets once the extension is installed on browser 
//   console.log(details);
// });
// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//   // Get called when page URL is updated or refreshed 
//   console.log(tabId, changeInfo);
// });


chrome.runtime.onMessage.addListener(async (data, sender, sendResponse) => {

  try{
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });
  
    const response = await chrome.tabs.sendMessage(tab.id, data); 
    chrome.runtime.sendMessage(response)
  } catch(ex){
    chrome.runtime.sendMessage({type: "error", message: ex.message})
  }

});


