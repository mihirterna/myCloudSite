import dispatcher from '../dispatcher';

export function loggedIn(data){
    dispatcher.dispatch({
        type:"loggedIn",
        data,
    });
}