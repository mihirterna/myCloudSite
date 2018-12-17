import {
    HEAD_CHANGED,
    DIR_CHANGED,
    MKDIR,
    SHOW_CB,
    SORT,
    LOGIN_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    mkdir:false,
    cb_val:false,
    checked_files: [],
    sAll:false,
    head: "",
    dirList: [],
    dir: "",
    files: "",
    fName: "",
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LOGIN_SUCCESS:
            console.log("Login success ", action.payload );
            return { ...state, files: action.payload.d, dir: action.payload.dir };
        case HEAD_CHANGED:
            return { ...state, head: action.payload };
        case DIR_CHANGED:
            console.log("DIR CHANGED ", action.payload );
            return { ...state, files: action.payload.files, dir: action.payload.dir };
        case MKDIR:
            return { ...state, mkdir: action.payload };
        case SHOW_CB:
            return { ...state, cb_val:action.payload.boo, checked_files: action.payload.fNames, sAll:action.payload.sall };
        case SORT:
            return{ ...state, files:action.payload.files };
        default:
            return state; //eslint-disable-next-line
    };
};
