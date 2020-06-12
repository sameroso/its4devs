import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer/authReducer';
import postsReducer from './postsReducer/postsReducer';

export default combineReducers({
  user: authReducer,
  form: formReducer,
  postsData: postsReducer,
});
