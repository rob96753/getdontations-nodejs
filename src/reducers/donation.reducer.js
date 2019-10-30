

import {GET_DONATIONS, ADD_DONATION, DELETE_DONATION, DONATIONS_LOADING}  from '../actions/types';


const initialState = {
    donations: [],
    loading: false
}


//@desc handle redux actions from the middleware
export default function(state=initialState, action) {
    console.log(action);
    switch (action.type) {
        case GET_DONATIONS:
            return {
                ...state,
                donations: action.donations,
                loading: false
            };
        default:
            return state;
        case ADD_DONATION:
            return {
                ...state,
                loading: false
            };
    }
}