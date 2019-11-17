import {GET_DONATIONS, ADD_DONATION, DELETE_DONATION, DONATIONS_LOADING}  from '../actions/types';


//@desc the loading value is used to indicate when the state is loading the data from external source
const initialState = {
    donations: [],
    loading: false
}


//@desc handle redux actions from the middleware
export default function(state=initialState, action) {
    switch (action.type) {
        case GET_DONATIONS:
            return {
                ...state,
                donations: action.donations,
                loading: false
            };
        case DONATIONS_LOADING:
            return {
                ...state,
                loading: true
            }
        case ADD_DONATION:
            return {
                donations: [action.payload, ...state.donations],
                loading: false
            };
        default:
            return state;
    }
}