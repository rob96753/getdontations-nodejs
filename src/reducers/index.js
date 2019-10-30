import { combineReducers } from 'redux';
import donationReducer from './donation.reducer';
import donorReducer from './donor.reducer';
import authReducer from './auth.reducer';


export default combineReducers({
    donation: donationReducer,
    donor: donorReducer,
    auth: authReducer
});