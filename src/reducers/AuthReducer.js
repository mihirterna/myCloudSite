import {
    ID_CHANGED,
    UNAME_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    HEAD_CHANGED,
    DIR_CHANGED,
    MKDIR,
    SHOW_CB,
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
    isLogin: false,
    mkdir:false,
    cb_val:false,
    checked_files: []
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
        case MKDIR:
            return {...state, mkdir:action.payload}
        case SHOW_CB:
            return {...state, cb_val:action.payload.boo, checked_files: action.payload.fNames}
        default:
            return state; //eslint-disable-next-line
    };
};
