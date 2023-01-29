import React, {useState} from 'react'
import useStore from '../store/useStore'
import Button from "../components/Button"
import Input from "../components/Input"

import {AiOutlineSend} from "react-icons/ai"

import {setErrorResponse} from "../store/actions"



let CHECK_URL = "teletalk.com.bd/application.php" 

export default function Form() { 


    const [state, dispatch] = useStore()


    const [data, setData] = useState()

 

    function sendCandidateData() {
        // if(!data){
        //     return dispatch(setErrorResponse("Please select Candidate JSON data", true))
        // } 

        // check if target website right or not 
        chrome.runtime.sendMessage("", {
            type: "getSiteURL"
        })



        // chrome.runtime.sendMessage("", {
        //     type: "candidateData",
        //     payload: data,
        // })
    }

    async function handleChange(e) {
        try {
            let files = e.target.files
            if (files && files[0]) {
                dispatch(setErrorResponse())
                let data = await readFileToJson(files[0])
                let obj = JSON.parse(data)
                if (obj) {
                    setData(data)
                } else {
                    dispatch(setErrorResponse("Please provide valid data object", true))
                }
            }
        } catch (ex) {
            dispatch(setErrorResponse(ex.message, true))
        }
    }

    function readFileToJson(file) {
        return new Promise((resolve, reject) => {
            let fileReader = new FileReader()
            fileReader.onload = function (e) {
                if (e.target.result) {
                    resolve(e.target.result)
                } else {
                    reject("Please provide valid json file")
                }
            }
            fileReader.onerror = function (_) {
                reject("Please provide valid json file")
            }
            fileReader.readAsText(file)
        })
    }


  return (
    <div>
        <div className="card">
                <Input
                    onChange={handleChange}
                    placeholder="Choose Data JSON file"
                    type="file"
                />
                <Button
                    className="mt-3 w-full flex items-center justify-center"
                    onClick={() => sendCandidateData()}
                >
                    Send Message <AiOutlineSend  className="ml-2"/>
                </Button>
            </div>
    </div>
  )
}
