import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer/authReducer';
import postsReducer from './postsReducer/postsReducer';
import userReducer from './userReducer/userReducer';
import profileUserReducer from './profileUserReducer/profileUserReducer';

export default combineReducers({
  user: authReducer,
  form: formReducer,
  postsData: postsReducer,
  users: userReducer,
  userProfile: profileUserReducer,
});
