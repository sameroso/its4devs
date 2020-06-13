import types from './types';
import axios from 'axios';

export const fetchMyUser = () => async (dispatch) => {
  const response = await axios.get('/auth/current_user');
  dispatch({ type: types.FETCH_MY_USER, payload: response.data });
};

export const updateUser = (data) => async (dispatch) => {
  const response = await axios.post('/api/updateuser', data);
  dispatch({ type: types.FETCH_MY_USER, payload: response.data });
};

export const fetchPosts = () => async (dispatch) => {
  const response = await axios.get('/api/posts');
  dispatch({ type: types.FETCH_POSTS, payload: response.data });
};
export const sendPost = (post) => async (dispatch) => {
  const response = await axios.post('/api/sendpost', post);
  dispatch({ type: types.FETCH_POSTS, payload: response.data });

  const response2 = await axios.post('/api/updateuserposts', post);
  dispatch({ type: types.FETCH_MY_USER, payload: response2.data });
};

export const deletePost = (postId) => async (dispatch) => {
  const response = await axios.post('/api/deletepost', postId);
  dispatch({ type: types.FETCH_POSTS, payload: response.data });

  const response2 = await axios.post('/api/deleteuserpost', postId);
  dispatch({ type: types.FETCH_MY_USER, payload: response2.data });
};
