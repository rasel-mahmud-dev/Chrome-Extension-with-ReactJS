import React from "react"
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5" 

export default function Error({ message, isError }) {
    return (
        message ? (
            <div className={`message ${isError ? "error" : ""}`}>
                {message}

                {!isError && <IoCheckmarkDoneCircleOutline />}
            </div>
        ) : null
    )
}
