import axios from "axios";
import {GET_DONATIONS, ADD_DONATION, DELETE_DONATION, DONATIONS_LOADING}  from './types';
import { returnErrors } from './error.action';
import {applyMiddleware as dispatch} from "redux";

//@desc Returns the action get donations to the reducer
export const getDonations = () => dispatch => {
    dispatch(setDonationsLoading());
    axios.get('http://localhost:5000/donation/')
        .then(response=> {
            dispatch({
                type: GET_DONATIONS,
                donations: response.data
                }
            )
        })
        .catch((error) => {
            dispatch(returnErrors(error.response.data, error.response.status))
        });

};

export const setDonationsLoading = () => {
    return {
        type: DONATIONS_LOADING
    };
};