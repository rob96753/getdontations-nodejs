import {GET_DONORS, ADD_DONOR, DELETE_DONOR, DONORS_LOADING} from './types';

//@desc Returns the action get, donations
export const getDonations = () => {
    return {
        type: GET_DONORS
        // this will actually return the list of donations
    }

}