import dispatcher from '../dispatcher';

export function loggedIn(data){
    dispatcher.dispatch({
        type:"loggedIn",
        data,
    });
}

export function dirChanged(data){
    dispatcher.dispatch({
        type:"dirChanged",
        data,
    });
}

export function dirBack(data){
    dispatcher.dispatch({
        type:"dirBack",
        data,
    });
}

export function download(data){
    dispatcher.dispatch({
        type:"download",
        data,
    });
}
    
export function dirList(data){
        dispatcher.dispatch({
            type:"dirList",
            data,
        });
    
    }
    
        


