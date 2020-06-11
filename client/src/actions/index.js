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
