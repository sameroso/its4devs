import types from '../../actions/types';
export default (state = [], action) => {
  console.log('oi');
  switch (action.type) {
    case types.FETCH_PROFILE_USER_HEADER:
      return [...state, action.payload];
    default:
      return state;
  }
};
