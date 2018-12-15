import {
    HEAD_CHANGED,
    DIR_CHANGED,
    MKDIR,
    SHOW_CB,
    SORT,
    LOGIN_FAILED
} from './types';
import axios from 'axios';
import _ from 'lodash';

const checkedFiles = []
let files = []

export const mkdir = (boolean) => {
    return {
        type: MKDIR,
        payload: boolean
    };
};

export const headChanged = (text) => {
    return {
        type: HEAD_CHANGED,
        payload: text
    };
};

export const show_cb = (data) => {
    if (data.clear) checkedFiles.length = 0
    else if (checkedFiles.includes(data.name)) checkedFiles.splice(checkedFiles.indexOf(data.name), 1)
    else checkedFiles.push(data.name)

    console.log('AuthAct ', checkedFiles)
    if (Array.isArray(checkedFiles) && checkedFiles.length) {
        const payload = {
            boo: true,
            sall: false,
            fNames: checkedFiles
        }
        return {
            type: SHOW_CB,
            payload
        };
    }
    else {
        const payload = {
            boo: false,
            sall: false,
            fNames: checkedFiles
        }
        return {
            type: SHOW_CB,
            payload
        };
    }

};

const dirChangedFailed = (dispatch, err) => {
    dispatch({
        type: LOGIN_FAILED,
        payload: err
    });
};

export const dirChanged = (data) => {
    return (dispatch) => {
        axios.post('http://localhost:5000/dir', { data }).then(res => {
            if (res.status === 200) {
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

export const sort = (key, data) => {
    switch (key) {
        case 1: //alphabetical sort
            files = _.sortBy(data, [function (o) { return o.name; }]);
            break
        case 2:
            break
        case 3:
            break
        case 4:
            break
        case 5:
            break
        case 6:
            break
        default:
            break
    }
    return (dispatch) => {
        const payload = {
            files: files
        }
        dispatch({
            type: SORT,
            payload
        });
    }
}

export const sAll = (data) => {
    if (data.length === checkedFiles.length) {
        checkedFiles.length = 0
        const payload = {
            boo: false,
            sall: true,
            fNames: checkedFiles
        }
        return {
            type: SHOW_CB,
            payload
        }
    }
    else {
        for (const k in data) {
            if (!checkedFiles.includes(data[k]["name"])) {
                checkedFiles.push(data[k]["name"])
            }
        }
        const payload = {
            boo: true,
            sall: true,
            fNames: checkedFiles
        }
        return {
            type: SHOW_CB,
            payload
        }
    }
}

export const dilite = (data) => {
    return (dispatch) => {
        //TODO: Delete
    }
}

export const copy = (data) => {
    return (dispatch) => {
        //TODO: Copy
    }
}

export const move = (data) => {
    return (dispatch) => {
        //TODO: Move
    }
}

export const cut = (data) => {
    return (dispatch) => {
        //TODO: Cut
    }
}

export const paste = (data) => {
    return (dispatch) => {
        //TODO: Paste
    }
}
