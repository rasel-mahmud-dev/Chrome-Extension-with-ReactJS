
//  received data form backgournd script
chrome.runtime.onMessage.addListener(
    async function(data, sender, sendResponse) {
        console.log(data);
      if(!data || !data.payload){

        return;
      }


      try{
        let candidateData = JSON.parse(data.payload)  
        console.log(candidateData);
        fillUp(candidateData)
      } catch(ex){
        console.log(ex);
      }

      sendResponse("I got message")

    }
  );


  // fill up all input function 
  function fillUp(data){
    for (let key in data) {
        let elem = document.getElementById(key) 
        if(elem && data[key]){
            elem.value = data[key]
        }
    }
}
