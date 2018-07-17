import React, { Component } from 'react';
import * as disAct from '../store/dispatchActions';
import resStore from '../store/ResStore';
import './mainBody.css'
import DirChar from'./dirChar'

export default class DirRow extends Component{
    constructor(){
        super()
        this.state={
            dir:resStore.getDir()
        }
    }

    componentWillMount(){
        resStore.on("dirChanged",()=>{
            this.setState({
                dir:resStore.getDir()
            })
        })
    }

    render(){
        var path = this.state.dir.split("/");
        return(
            <div className="dirRow">
                <h2>Directory -> </h2>
                {path.map(function(key,i){
                    return (<DirChar key={i} n={key}/>)
                    })}
            </div>
        )
    }
}