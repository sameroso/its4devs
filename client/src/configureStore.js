import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import rootReducer from './reducers';

export const middlewares = [reduxThunk];

export default createStore(rootReducer, {}, applyMiddleware(reduxThunk));
