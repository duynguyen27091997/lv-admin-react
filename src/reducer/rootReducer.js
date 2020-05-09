import {LOG_OUT, SET_AUTH} from "../actions/rootAction";

let initialState = {
    user: {}
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH:
            return state = {...state,user:action.res}
        case LOG_OUT:
            return state = {...state,user:action.res}
        default:
            return state
    }
};
export default rootReducer;