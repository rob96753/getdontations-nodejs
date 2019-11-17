import {GET_DONORS, GET_ELIGIBLE_DONORS, DONOR_ADDED, DONOR_ADD_FAILED, DELETE_DONOR, DONORS_LOADING} from '../actions/types';

const initialState = {
    donors: [],
    loading: false,
    type: null,
    msg: null
}


export default function(state=initialState, action) {
    switch (action.type) {
        case DONORS_LOADING:
            return {
                ...state,
                donors: action.donor,
                loading: true
            }
        case DONOR_ADDED:
            return {
                ...state,
                donors: action.donor,
                loading: false,
                type: DONOR_ADDED,
                msg: action.msg
            }
        case GET_DONORS:
            console.log(action.donors);
            return {
                ...state,
                type: GET_DONORS,
                donors: action.donors,
                loading: false
            }
        case GET_ELIGIBLE_DONORS:
            return {
                ...state,
                donors: action.donors,
                loading: false
            }
        default:
            return state;
    }
}