import {GET_DONATIONS, ADD_DONATION, DELETE_DONATION, CREATE_DONATIONS, DONATIONS_LOADING}  from './types';
import axios from "axios";
import { returnErrors } from './error.action';
import {applyMiddleware as dispatch} from 'redux';
import {tokenConfig} from "./auth.action";

//@desc Returns the action get donations to the reducer
export const getDonations = () => (dispatch, getState) => {
    dispatch(setDonationsLoading());
    axios.get('http://localhost:5000/donation/', tokenConfig(getState))
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

//@desc Returns numberDonations donation information
export const createDonations = (numberDonations) => (dispatch, getState) => {
    dispatch(setDonationsLoading());
    axios.post('http://localhost:5000/donation/', numberDonations, tokenConfig(getState))
        .then(response=> {
            dispatch({
                    type: CREATE_DONATIONS,
                    donations: response.data
                }
            )
        })
        .catch((error) => {
            dispatch(returnErrors(error.response.data, error.response.status))
        });

};

//@desc adds a donation to the database
export const addDonation = donation => dispatch => {
   axios.post('http://localhost:5000/donation/add', donation)
       .then(response =>
                dispatch({
                    type: ADD_DONATION,
                    payload: response.data
                }))
       .catch((error) => {
           dispatch(returnErrors(error.response.data, error.response.status))
       });
}

export const setDonationsLoading = () => {
    return {
        type: DONATIONS_LOADING
    };
};

