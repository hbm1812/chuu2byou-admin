import { combineReducers } from '@reduxjs/toolkit';
import notificationReducer from './reducers/notificationReducer';
import loadingReducer from './reducers/loadingReducer';

const rootReducer = combineReducers({
  loading: loadingReducer,
  notification: notificationReducer,
});

export default rootReducer;