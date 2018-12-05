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
    SORT
} from './types';
import axios from 'axios';

const checkedFiles = []
let files = []

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
    else if(checkedFiles.includes(data.name))checkedFiles.splice( checkedFiles.indexOf(data.name), 1 )
    else checkedFiles.push(data.name)

    console.log('AuthAct ',checkedFiles)
    if(Array.isArray(checkedFiles) && checkedFiles.length){
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
      else{
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

export const sort = (key, data) => {
    switch(key){
        case 1:
        files = data.sort(function(a, b){
                    if(a["name"] < b["name"]){
                        return -1;
                    }else if(a["name"] > b["name"]){
                        return 1;
                    }else{
                        return 0;   
                    }
                })
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
        const payload ={
            files: files
        }
        dispatch({
            type: SORT,
            payload
        });
    }
}

export const sAll = (data) => {
    if(data.length === checkedFiles.length){
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
else{
    for(const k in data){
        if(!checkedFiles.includes(data[k]["name"])){
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






