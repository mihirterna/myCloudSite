import {
    ID_CHANGED,
    UNAME_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    HEAD_CHANGED,
    DIR_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
    head: "",
    uid: "",
    uname: "",
    password: "",
    dir: "",
    files: "",
    fName: "",
    err: "",
    dirList: [],
    isLogin: false
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
            return { ...state, files: action.payload.d,dir: action.payload.dir, isLogin: true };
        case LOGIN_FAILED:
            return { ...state, err: action.payload.err };
        case HEAD_CHANGED:
            return { ...state, head: action.payload  };
        case DIR_CHANGED:
            return { ...state, files: action.payload.files, dir: action.payload.dir };
        default:
            return state; //eslint-disable-next-line
    };
};
