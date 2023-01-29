import React, { useState } from "react"

function Input({ className = "", type, onChange, placeholder, ...attr }) {
    const [file, setFile] = useState()

    function chooseImage() {
        let inputFile = document.createElement("input")
        inputFile.setAttribute("type", "file")
        inputFile.addEventListener("change", (e) => {
            let files = e.target.files
            if (files && files[0]) {
                setFile(files[0])
            }
            onChange(e)
        })
        inputFile.click()
    }

    return (
        <div className="overflow-hidden">
            {type === "textarea" ? (
                <textarea onChange={onChange} className={`textarea input btn ${className}`}
            
                {...attr}></textarea>
            ) : (
                <>
                    {file && <span className="label-file">{file.name}</span>}
                    <div
                        className={`btn ${className}`}
                        onClick={chooseImage}
                        {...attr}
                    >
                        <span className="label">{placeholder}</span>
                    </div>
                </>
            )}
        </div>
    )
}

export default Input
