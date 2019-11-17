import {
    USER_AUTHENTICATED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types';
import axios from 'axios';
import {returnErrors} from "./error.action";


//@desc Check token & load user
export const loadUser = () => (dispatch, getState) => {
    // user loading
    dispatch({type: USER_LOADING});

    axios.get('http://localhost:5000/api/users/user', tokenConfig(getState))
        .then(res=> dispatch(
            {type: USER_AUTHENTICATED,
             payload: res.data
        })
        )
        .catch(err=> {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        });
};

//@desc setup config/headers and token
export const tokenConfig = getState => {
    // Get token from localstorage
    const token = getState().auth.token;


    //Headers
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    };

    // If token, add to headers
    if (token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
}

//@desc Register the User to the Database by Calling the appropriate service
export const register = ({firstname, lastname, emailaddress, password }) => dispatch => {

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request Body
    const body = JSON.stringify({firstname, lastname, emailaddress, password });

    axios.post('http://localhost:5000/api/users/register', body, config)
        .then(response=>
        dispatch(
            {
                type: REGISTER_SUCCESS,
                payload: response.data
            })
        )
        .catch(err=>{
            dispatch(
                returnErrors(err.response.data, err.response.status, REGISTER_FAIL)
            )
        })



}

//@desc Login in the user by calling the appropriate service
export const login = ({emailaddress, password}) => dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //Request Body
    const body = JSON.stringify({emailaddress, password});

    axios.post('http://localhost:5000/api/login/authenticate', body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
                }
            )
        })
        .catch(err => {
            dispatch(
                returnErrors(err.response.data, err.response.status, LOGIN_FAIL)
            )
        });
}

//@desc Logout the User
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

