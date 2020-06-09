import actionTypes from '../../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MY_USER:
      return action.payload || false;
    default:
      return state;
  }
};
