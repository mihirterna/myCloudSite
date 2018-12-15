import {
    ID_CHANGED,
    UNAME_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
} from '../actions/types';

const INITIAL_STATE = {
    uid: "",
    uname: "",
    password: "",
    err: "",
    isLogin: false,
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ID_CHANGED:
            return { ...state, uid: action.payload };
        case UNAME_CHANGED:
            return { ...state, uname: action.payload };
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case LOGIN_SUCCESS:
            return { ...state, isLogin: true };
        case LOGIN_FAILED:
            return { ...state, err: action.payload.err };
        default:
            return state; //eslint-disable-next-line
    };
};
