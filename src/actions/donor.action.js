import {GET_DONORS, ADD_DONOR, DONOR_ADDED, DONOR_ADD_FAILED, DONORS_LOADING} from './types';
import axios from 'axios';
import {returnErrors} from './error.action';
import { tokenConfig } from './auth.action';
import {applyMiddleware as dispatch} from 'redux';

//@desc Returns the action get, donations
export const getDonors = () => (dispatch, getState) => {
    // this will actually return the list of donations
    dispatch(setDonorsLoading());
    axios.get('http://localhost:5000/donor/', tokenConfig(getState))
        .then(response=> {
            dispatch({
                    type: GET_DONORS,
                    donors: response.data
                }
            )
        })
        .catch((error) => {
            dispatch(returnErrors(error.response.data, error.response.status))
        });
};

export const getEligible = () => (dispatch, getState) => {
    // this will actually return the list of donations
    dispatch(setDonorsLoading());


    axios.get('http://localhost:5000/donor/', tokenConfig(getState))
        .then(response=> {
            dispatch({
                    type: GET_DONORS,
                    donors: response.data
                }
            )
        })
        .catch((error) => {
            dispatch(returnErrors(error.response.data, error.response.status))
        });
};

export const setDonorsLoading = () => {
    return {
        type: DONORS_LOADING
    };
};

export const setAddDonor = () => {
    return {
        type: ADD_DONOR
    }
}

//@desc
export const addDonor = donor => (dispatch, getState) => {
    dispatch(setAddDonor());
    axios.post('http://localhost:5000/donor/add', donor, tokenConfig(getState))
        .then(response=> {
            dispatch({
                    type: DONOR_ADDED,
                    donors: donor,
                    msg: response.data.msg
                }
            )
        })
        .catch((error) => {
            dispatch(returnErrors(error.response.data, error.response.status))
        });
};