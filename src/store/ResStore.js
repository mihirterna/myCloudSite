import {EventEmitter} from 'events';
import dispatcher from '../dispatcher';

class ResStore extends EventEmitter{
    constructor(){
        super();
        this.data={
            devID:"",
            uname:"",
            pswd:"",
            dir:"",
        }
        this.dir=""
        this.fName=""
        this.dirList=[]
    }

    setData(data){
        this.data=data;
        this.dir=data.dir
        this.emit("loggedIn");
    }
    getData(){
        return this.data;
    }
    setDir(data){
        this.dir=this.dir+"/"+data;
        this.emit("dirChanged")
    }
    getDir(){
        return this.dir
    }
    setDw(data){
        this.fName=data;
        this.emit("download")
    }
    getfName(){
        return this.fName;
    }
    setDirBack(data){
        var path = this.dir.split("/");
        this.dir = path.slice(0, path.indexOf(data)+1).join("/");
        this.emit("dirChanged")
    }
    setDirList(data){
        this.dirList = data
    }
    getDirList(){
        return this.dirList
    }
    
    handleActions(action){
        switch(action.type){
            case "loggedIn":
            this.setData(action.data);
            break;
            case "dirChanged":
            this.setDir(action.data);
            break
            case "dirBack":
            this.setDirBack(action.data)
            break
            case "download":
            this.setDw(action.data)
            break
            case "dirList":
            this.setDirList(action.data)
            break
            default:
            alert("Different Action");
            break
        }
    }
}

const resStore = new ResStore();
dispatcher.register(resStore.handleActions.bind(resStore));
window.dispatcher = dispatcher;
export default resStore;