  
import { combineReducers } from 'redux';
import post_Reducer from './post';
import github_Reducer from './github';

export default combineReducers({
  post_Reducer,
  github_Reducer
});