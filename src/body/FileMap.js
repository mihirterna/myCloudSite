import React, { Component } from 'react';
import Card from './card';
import * as actions from '../actions';
import { connect } from 'react-redux';
import DirRow from './dirRow'
import FileActions from './FileUpload'

const mapStateToProps = state => {
    return {
        files: state.auth.files,
        dir: state.auth.dir,
        head: state.auth.head,
        err: state.auth.err
    };
};

class FileMap extends Component{

    alertError(){
        if(this.props.err) console.log(this.props.err);
    }

    sortOn(property){
        return function(a, b){
            if(a[property] < b[property]){
                return -1;
            }else if(a[property] > b[property]){
                return 1;
            }else{
                return 0;   
            }
        }
    }

    
    render(){
        const e = this.props.files;
        const d = []
        for(let i=0;i<this.props.files.length;i++){
            if(!e[i]["name"].startsWith(".")) d.push(e[i])
        }
        //d.sort((a, b) => a["name"] > b["name"])
        d.sort(this.sortOn("name"))
        return(
            <div>
                <DirRow />
                <FileActions/>
                <div>
                {Object.keys(d).map(function(key){
                    return <div key={key}><Card d={d[key]} k={key}/></div>
                })}
                </div>
            </div>
         );
    }
}

export default connect(mapStateToProps, actions)(FileMap);
