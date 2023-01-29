import React, { useEffect, useState } from "react"
import "./App.css"
import Button from "./components/Button"
import useStore from "./store/useStore"
import Form from "./views/Form"
import About from "./views/About"
import { AiOutlineHome } from "react-icons/ai"
import { BiHelpCircle } from "react-icons/bi"

import Error from "./components/Error"

function App() {
    const [state, dispatch] = useStore()
    const [tab, setTab] = useState(1)

    return (
        <div className="App">
            {tab === 1 ? (
                <div>
                    <h1 className="title">Auto Fill Input</h1>
                    <Form />

                    <Error {...state.response} />
                </div>
            ) : (
                <About />
            )}

            <div className="bottom-bar">
                <Button
                    onClick={() => setTab(1)}
                    className={`mt-3 w-full flex items-center justify-center ${tab === 1 ? "active": "inactive"}`}
                >
                    Home <AiOutlineHome className="ml-2" />
                </Button>

                <Button
                    onClick={() => setTab(2)}
                    className={`mt-3 w-full flex items-center justify-center ${tab === 2 ? "active": "inactive"}`}
                >
                    About <BiHelpCircle className="ml-2" />
                </Button>
            </div>
        </div>
    )
}

export default App
