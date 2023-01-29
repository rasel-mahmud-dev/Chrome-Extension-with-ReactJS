chrome.runtime.onMessage.addListener(async (data, sender, sendResponse) => {
  if (data.type === "message") {
    
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });


    const response = await chrome.tabs.sendMessage(tab.id, data.message);
    
    // do something with response here, not outside the function
    console.log(response);  

    
  }
});

//   chrome.runtime.onInstalled.addListener( () => {
//     chrome.contextMenus.create({
//       id: 'notify',
//       title: "Notify!: %s",
//       contexts:[ "selection" ]
//     });
//   });

//   chrome.contextMenus.onClicked.addListener( ( info, tab ) => {
//     if ( 'notify' === info.menuItemId ) {
//       notify( info.selectionText );
//     }
//   } );

// const notify = message => {
//   return chrome.notifications.create(
//     '',
//     {
//       type: 'basic',
//       title: 'Notify!',
//       message: message || 'Notify!',
//       iconUrl: './assets/icons/128.png',
//     }
//   );
// };
