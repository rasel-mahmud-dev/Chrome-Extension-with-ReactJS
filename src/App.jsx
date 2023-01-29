import React, { useEffect, useState } from "react"
import "./App.css"
import Button from "./components/Button"
import useStore from "./store/useStore"
import Form from "./views/Form"
import About from "./views/About"
import { AiOutlineHome } from "react-icons/ai"
import { BiHelpCircle } from "react-icons/bi"

function App() {
    const [state, dispatch] = useStore()
    const [tab, setTab] = useState(1)

    return (
        <div className="App">
            {tab === 1 ? (
                <div>
                    <h1 className="title">Auto Fill Input</h1>
                    <Form />

                    {state.response.message && (
                        <div
                            className={`message ${
                                state.response.isError ? "error" : ""
                            }`}
                        >
                            {state.response.message}
                        </div>
                    )}
                </div>
            ) : (
                <About />
            )}

            <div className="bottom-bar">
                <Button
                    onClick={() => setTab(1)}
                    className="mt-3 w-full flex items-center justify-center"
                >
                    Home <AiOutlineHome className="ml-2" />
                </Button>

                <Button
                    onClick={() => setTab(2)}
                    className="mt-3 w-full flex items-center justify-center"
                >
                    About <BiHelpCircle className="ml-2" />
                </Button>
            </div>
        </div>
    )
}

export default App
