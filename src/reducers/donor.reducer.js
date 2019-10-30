import {GET_DONORS, ADD_DONOR, DELETE_DONOR, DONORS_LOADING} from '../actions/types';

const initialState = {
    donors: [],
    loading: false
}

export default function(state=initialState, action) {
    switch (action.type) {
        case GET_DONORS:
            return {
                ...state,
                doners: action.doners,
                loading: false
            }
        default:
            return state;
    }
}