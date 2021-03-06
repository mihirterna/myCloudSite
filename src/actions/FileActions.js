import {
    HEAD_CHANGED,
    DIR_CHANGED,
    MKDIR,
    SHOW_CB,
    SORT,
    LOGIN_FAILED,
    SHARE_LINK
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
    let payload = {}
    if (data.clear) checkedFiles.length = 0
    else if (checkedFiles.includes(data.name)) checkedFiles.splice(checkedFiles.indexOf(data.name), 1)
    else checkedFiles.push(data.name)

    if (checkedFiles.length === 0) {
        payload = {
            boo: false,
            sall: false,
            fNames: checkedFiles
        }
    }
    else {
        payload = {
            boo: true,
            sall: false,
            fNames: checkedFiles
        }
    }
    //console.log(checkedFiles);
    return (dispatch) =>
        dispatch({
            type: SHOW_CB,
            payload
        });
};

export const sAll = (data) => {
    if (data.length === checkedFiles.length) {
        checkedFiles.length = 0
        const payload = {
            boo: false,
            sall: false,
            fNames: checkedFiles
        }
        return (dispatch) =>
            dispatch({
                type: SHOW_CB,
                payload
            })
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
        return (dispatch) =>
            dispatch({
                type: SHOW_CB,
                payload
            })
    }
}

const dirChangedFailed = (dispatch, err) => {
    dispatch({
        type: LOGIN_FAILED,
        payload: err
    });
};

export const createFolder = (name, cb) => {
    return (dispatch) =>
        axios.post('http://localhost:5000/dir/new', { name }).then(res => {
            if (res.status === 200) {
                cb(true);
                const payload = {
                    files: [],
                    dir: name
                };
                dispatch({
                    type: DIR_CHANGED,
                    payload
                });
            }
            else if (res.status === 500) {
                cb(false);
            }
        }).catch(err => {
            cb(false);
        });
};

export const shareDownloadLink = (data, cb) => {
    return (dispatch) =>
        axios.post('http://localhost:5000/shr/link', data).then(res => {
            if (res.status === 200) {

                const payload = {
                    dir: res.data.dir,
                    fName: res.data.fName,
                    link: "http://localhost:5000/dw/tmp?dir=" + res.data.dir + "&f=" + res.data.fName
                }
                dispatch({
                    type: SHARE_LINK,
                    payload
                })
                cb(true)
            }
            else if (res.status === 500) {
                cb(false)
                console.log("error ", res);
            }
        }).catch(err => {
            cb(false)
            console.log("error ", err);
        });
}

export const downloadZip = (data) => {
    return (dispatch) =>
        axios.post('http://localhost:5000/shr/link', data).then(res => {
            if (res.status === 200) {
                const url = "http://localhost:5000/dw/tmp?dir=" + res.data.dir + "&f=" + res.data.fName
                window.location.href = url
                const payload = {
                    link: "link"
                }
                dispatch({
                    type: SHARE_LINK,
                    payload
                })
            }
            else if (res.status === 500) {
                console.log("error ", res);
            }
        }).catch(err => {
            console.log("error ", err);
        });
}

export const dirChanged = (data) => {
    return (dispatch) => {
        axios.post('http://localhost:5000/dir', data).then(res => {
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
            console.log(files);
            break
        case 2:
            files = _.sortBy(data, [function (o) { return o.name; }]);
            files = files.reverse()
            console.log(files);
            break
        case 3:
            files = _.sortBy(data, [function (o) { return o.size; }]);
            console.log(files);
            break
        case 4:
            files = _.sortBy(data, [function (o) { return o.size; }]);
            files = files.reverse()
            console.log(files);
            break
        case 5:
            files = _.sortBy(data, [function (o) { return o.lm; }]);
            console.log(files);
            break
        case 6:
            files = _.sortBy(data, [function (o) { return o.lm; }]);
            files = files.reverse()
            console.log(files);
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


export const rename = (data, cb) => {
    return (dispatch) => {
        axios.post('http://localhost:5000/dir/rename', { data }).then(res => {
            if (res.status === 200) {
                cb(true)
                const payload = {
                    files: res.data,
                    dir: data.dir
                };
                dispatch({
                    type: DIR_CHANGED,
                    payload
                });
            }
        }).catch(error => {
            cb(false)
            dirChangedFailed(dispatch, error)
        });
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
