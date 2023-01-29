import ACTION_TYPES from "./actionTypes";


export function setErrorResponse(message = "", isError = false){
    return {
        type: ACTION_TYPES.SET_RESPONSE,
        payload: {message, isError}
    }
}