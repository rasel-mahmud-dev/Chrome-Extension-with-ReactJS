import ACTION_TYPES from "./actionTypes";

export const initialState = {
    response: {
        message: "",
        isError: false,
    }
}

function appReducer(state, action){


    switch(action.type){

        case ACTION_TYPES.CHECK_SITE_URL:
            return state

            
        case ACTION_TYPES.SET_RESPONSE:
            return {
                ...state,
                response: action.payload
            }



        default:
            return state
    }
}

export default appReducer