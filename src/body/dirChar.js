import React, { Component } from 'react';
import * as disAct from '../store/dispatchActions';
import resStore from '../store/ResStore';
import {Button} from '@material-ui/core';

export default class DirChar extends Component{
    constructor(props){
        super(props)
        this.state={
            dir:resStore.getDir,
            fName:props.n,
        }
    }
    onClick(){
        disAct.dirBack(this.state.fName)
    }
    componentWillReceiveProps(newProp){
        this.setState({
          fName:newProp.n
        })
      }
    render(){
        return(
            <div>
                <Button variant="outlined" onClick={this.onClick.bind(this)}>{this.state.fName}/</Button>
            </div>
        )
    }
}