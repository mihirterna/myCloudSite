import {EventEmitter} from 'events';
import dispatcher from '../dispatcher';

class ResStore extends EventEmitter{
    constructor(){
        super();
        this.data={
            devID:"",
            uname:"",
            pswd:"",
        }
    }

    setData(data){
        this.data=data;
        this.emit("loggedIn");
    }
    getData(){
        return this.data;
    }

    handleActions(action){
        switch(action.type){
            case "loggedIn":
                this.setData(action.data);
                break;
            default:
                return;
        }
    }
}

const resStore = new ResStore();
dispatcher.register(resStore.handleActions.bind(resStore));
window.dispatcher = dispatcher;
export default resStore;