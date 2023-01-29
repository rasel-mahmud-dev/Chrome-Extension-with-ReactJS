import React, { useEffect, useState } from "react"
import useStore from "../store/useStore"
import Button from "../components/Button"
import Input from "../components/Input"

import { AiOutlineSend } from "react-icons/ai"

import { setErrorResponse } from "../store/actions"

const testData = {
    dep_status: "5",
    name: "MD. Test MIAH",
    name_bn: "মো রহিম মিয়া",
    father: "MD. MISTER SORKER",
    father_bn: "মো করিম সরকার",
    mother: "MST. ANJU ARA BEGUM",
    mother_bn: "মোছা রেহানা বেগম",
    dob: "1994-12-11",
    nationality: "Bangladeshi",
    religion: "1",
    gender: "Male",
    marital_status: "Married",
    spouse_name: "MST. Alex",
    nid: "1",
    nid_no: "19922222222000172",
    passport: "0",
    breg: "1",
    breg_no: "00009998552002160",
    mobile: "01812345678",
    confirm_mobile: "01812345678",
    email: "demo.mail@gmail.com",
    quota: "8",
    present_careof: "MD. MISTER SORKER",
    present_village: "WEST TEKANI",
    present_district: "10",
    present_upazila: "076",
    present_post: "HORIKHALI",
    present_postcode: "3432",
    same_as_present: "1",
    ssc_exam: "1",
    ssc_roll: "888838",
    ssc_group: "1",
    ssc_board: "3",
    ssc_result_type: "5",
    ssc_result: "4.94",
    ssc_year: "2009",
    hsc_exam: "1",
    hsc_roll: "993234",
    hsc_group: "1",
    hsc_board: "3",
    hsc_result_type: "5",
    hsc_result: "5.0",
    hsc_year: "2011",
    "other_exp[0][value]": "1",
}

let CHECK_URL = "teletalk.com.bd/application.php"

function Form() {
    const [_, dispatch] = useStore() 


    const [isValidSite, setValidSite] = useState(false)

    const [data, setData] = useState()

    function messageSubscriber(data) { 
        
        if (data.type === "getSiteURL") {
            if (data.response && data.response.includes(CHECK_URL)) {
                // now send data for fill all input...
    
                setValidSite(true)
            } else {
                setValidSite(false)
                dispatch(setErrorResponse("Please Go to teletalk apply website", true))
            }
        } else if(data.type === "error"){
            if(data.message === "Cannot read properties of undefined (reading 'id')"){
                dispatch(setErrorResponse("Please focus current tab Before Fill Up", true))
            } else{
                dispatch(setErrorResponse(data.message, true))
            }
        } else if(data.type === "data_full_up_success"){
            dispatch(setErrorResponse(data.message, false))
        }
    }

    useEffect(() => {
        chrome.runtime.onMessage.addListener(messageSubscriber) 

        // unsubscribe when unmount this components
        return () => chrome.runtime.onMessage.removeListener(messageSubscriber)
    }, [])


    useEffect(()=>{
        if(isValidSite){ 
            console.log(data);
            sendCandidateData()
        }

    }, [isValidSite])

    

    function sendCandidateData() { 
        
        chrome.runtime.sendMessage("", {
            type: "candidateData",
            payload: data,
        })
    }

    function checkContentSiteLocation() {
        dispatch(setErrorResponse())
        setValidSite(false)

        if (!data) {
            return dispatch(
                setErrorResponse("Please select Candidate JSON data", true)
            )
        }

        try {
            let validData = JSON.parse(data)
        } catch (ex) {
            return dispatch(
                setErrorResponse("Please provide valid JSON data", true)
            )
        }

        // check if target website right or not
        chrome.runtime.sendMessage("", {
            type: "getSiteURL",
        })
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
                    dispatch(
                        setErrorResponse(
                            "Please provide valid data object",
                            true
                        )
                    )
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

    function fillWithDemoData() {
        setData(JSON.stringify(testData, undefined, 2))
    }

    function handleChangeText(e) {
        setData(e.target.value)
    }

    return (
        <div>
            <div className="card">
                <Input
                    onChange={handleChange}
                    placeholder="Choose Data from JSON file"
                    type="file"
                />

                <Input
                    onChange={handleChangeText}
                    className="mt-3"
                    value={data}
                    placeholder="Paste json data"
                    type="textarea"
                />

                <div className="flex items-center justify-between">
                    <Button
                        className="mt-3 flex items-center justify-center"
                        onClick={checkContentSiteLocation}
                    >
                        Fill Up <AiOutlineSend className="ml-2" />
                    </Button>

                    <Button
                        className="mt-3 flex items-center justify-center"
                        onClick={fillWithDemoData}
                    >
                        Use Demo Data <AiOutlineSend className="ml-2" />
                    </Button>
                </div>
            </div>
        </div>
    )
}


export default Form