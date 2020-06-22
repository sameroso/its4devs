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

  /* const response2 = await axios.post('/api/updateuserposts', post);
  dispatch({ type: types.FETCH_MY_USER, payload: response2.data }); */
};

export const deletePost = (postId) => async (dispatch) => {
  const response = await axios.post('/api/deletepost', postId);
  dispatch({ type: types.FETCH_POSTS, payload: response.data });

  /* const response2 = await axios.post('/api/deleteuserpost', postId);
  dispatch({ type: types.FETCH_MY_USER, payload: response2.data }); */
};

export const editPost = (postId) => async (dispatch) => {
  const response = await axios.post('/api/editpost', postId);
  dispatch({ type: types.FETCH_POSTS, payload: response.data });

  /* const response2 = await axios.post('/api/edituserpost', postId);
  dispatch({ type: types.FETCH_MY_USER, payload: response2.data }); */
};
export const createComment = (data) => async (dispatch) => {
  const response = await axios.post('/api/createcommentpost', data);
  dispatch({ type: types.FETCH_POSTS, payload: response.data });

  /* const response2 = await axios.post('/api/createcommentuser', data);
  dispatch({ type: types.FETCH_MY_USER, payload: response2.data }); */
};

export const editComment = (data) => async (dispatch) => {
  const response = await axios.post('/api/editcomment', data);
  dispatch({ type: types.FETCH_POSTS, payload: response.data });
};

export const deleteComment = (data) => async (dispatch) => {
  const response = await axios.post('/api/deletecomment', data);
  dispatch({ type: types.FETCH_POSTS, payload: response.data });
};
export const addLike = (data) => async (dispatch) => {
  const response = await axios.post('/api/addlike', data);
  dispatch({ type: types.FETCH_POSTS, payload: response.data });
};
export const toggleLike = (data) => async (dispatch) => {
  const response = await axios.post('/api/togglelike', data);
  dispatch({ type: types.FETCH_POSTS, payload: response.data });
};
export const fetchUser = (data) => async (dispatch) => {
  const response = await axios.post('/api/fetchuser', data);
  dispatch({ type: types.FETCH_USER, payload: response.data });
};
export const emptyUsers = (data) => {
  return { type: types.EMPTY_USERS };
};

export const fetchUserProfile = (data) => async (dispatch) => {
  const response = await axios.post('/api/fetchuser', data);
  dispatch({ type: types.FETCH_PROFILE_USER, payload: response.data });
};

export const fetchUserPostProfile = (data) => async (dispatch) => {
  const response = await axios.post('/api/fetchuser', data);
  dispatch({ type: types.FETCH_PROFILE_USER_HEADER, payload: response.data });
};
