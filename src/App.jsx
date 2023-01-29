import React , { useEffect, useState } from "react"
import "./App.css"


function App() {
    
    function handleSendMessageToContent() {
        chrome.runtime.sendMessage('', {
            type: 'message',
            message: "Got Message from React Extension"
        });
    }


    
    return (
        <div className="App">
            <h1>Chrome Extension with ReactJS</h1>
            <div className="card">
                <button onClick={()=>handleSendMessageToContent()}>Send Message</button>
            </div>
        </div>
    )
}

export default App
