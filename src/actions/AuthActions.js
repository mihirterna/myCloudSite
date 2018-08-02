import {
    ID_CHANGED,
    UNAME_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    HEAD_CHANGED,
    DIR_CHANGED,
    MKDIR,
    SHOW_CB
} from './types';
import axios from 'axios';

const checkedFiles = []

export const idChanged = (text) => {
    return {
        type: ID_CHANGED,
        payload: text
    };
};


export const mkdir = (boolean) => {
    return {
        type: MKDIR,
        payload: boolean
    };
};

export const show_cb = (data) => {
    if(data.clear) checkedFiles.length = 0
    else if(data.delete)checkedFiles.splice( checkedFiles.indexOf(data.name), 1 )
    else checkedFiles.push(data.name)

    console.log('AuthAct ',checkedFiles)
    if(Array.isArray(checkedFiles) && checkedFiles.length){
        return {
            type: SHOW_CB,
            payload: true
        };
      }
      else{
        return {
            type: SHOW_CB,
            payload: false
        };
      }
    
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    }
}

export const unameChanged = (text) => {
    return {
        type: UNAME_CHANGED,
        payload: text
    };
};

export const headChanged = (text) => {
    return {
        type: HEAD_CHANGED,
        payload: text
    };
};

const loginUserSuccess = (dispatch, data) => {
    dispatch({
        type: LOGIN_SUCCESS,
        payload: data
    });
    
    //  dispatch({
    //      type: DIR_CHANGED,
    //      payload: forDir
    //  });
}

const loginUserFailed = (dispatch, err) => {
    dispatch({
        type: LOGIN_FAILED,
        payload: err
    });
};

export const loginUser = (data) => {
    return (dispatch) => {
        axios.post('http://localhost:5000/dir', {data})
        .then(res => {
            const deta = {d: res.data, head: data.head, dir: data.dir}
            if(res.status === 200) loginUserSuccess(dispatch,deta);
        }).catch(error => loginUserFailed(dispatch, error));
    };
};

const dirChangedFailed = (dispatch, err) => {
    dispatch({
        type: LOGIN_FAILED,
        payload: err
    });
};

export const dirChanged = (data) => {
    return (dispatch) => {
        axios.post('http://localhost:5000/dir', {data})
        .then(res => {
            if(res.status === 200){
                const payload = {
                    files: res.data,
                    dir: data.dir
                };
                dispatch({
                    type: DIR_CHANGED,
                    payload
                });
            }
        }).catch(error => dirChangedFailed(dispatch, error));
    };
};
