import { combineReducers } from 'redux';
import donationReducer from './donation.reducer';
import donorReducer from './donor.reducer';
import authReducer from './auth.reducer';
import errorReducer from './error.reducer';


export default combineReducers({
    donation: donationReducer,
    donors: donorReducer,
    auth: authReducer,
    error: errorReducer
});