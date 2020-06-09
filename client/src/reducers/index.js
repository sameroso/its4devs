import { combineReducers } from 'redux';
import authReducer from './authReducer/authReducer';

export default combineReducers({
  user: authReducer,
});
