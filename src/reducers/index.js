import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import FileReducer from './FileReducer';

export default combineReducers({
    auth: AuthReducer,
    file: FileReducer
});
