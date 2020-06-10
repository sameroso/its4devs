import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer/authReducer';

export default combineReducers({
  user: authReducer,
  form: formReducer,
});
