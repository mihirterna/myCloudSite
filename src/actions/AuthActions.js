import {
    ID_CHANGED,
    UNAME_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    HEAD_CHANGED,
    DIR_CHANGED
} from './types';
import axios from 'axios';

export const idChanged = (text) => {
    return {
        type: ID_CHANGED,
        payload: text
    };
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

const loginUserSuccess = (dispatch, data, forDir) => {
    dispatch({
        type: LOGIN_SUCCESS,
        payload: data
    });
    // dispatch({
    //     type: DIR_CHANGED,
    //     payload: forDir
    // });
}

const loginUserFailed = (dispatch, err) => {
    dispatch({
        type: LOGIN_FAILED,
        payload: err
    });
};

export const loginUser = (data) => {
    return (dispatch) => {
        axios.post('http://localhost:5000', data)
        .then(res => {
            alert("Res after loginUser: " + res.data);
            if(res.status === 200) loginUserSuccess(dispatch, res.data, {head: data.head, dir: data.dir});
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
        axios.post('http://localhost:5000', data)
        .then(res => {
            if(res.status === 200){
                const payload = {
                    files: res.data,
                    dir: data.dir
                };
                alert(payload.files, payload.dir);
                dispatch({
                    type: DIR_CHANGED,
                    payload
                });
            }
        }).catch(error => dirChangedFailed(dispatch, error));
    };
};
