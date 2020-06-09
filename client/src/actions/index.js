import types from './types';
import axios from 'axios';

export const fetchMyUser = () => async (dispatch) => {
  const response = await axios.get('/api/current_user');
  dispatch({ type: types.FETCH_MY_USER, payload: response.data });
};
export const useMe = () => async (dispatch) => {
  dispatch({ type: types.FETCH_MY_USER });
};
