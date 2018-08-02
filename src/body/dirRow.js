import React, { Component } from 'react'
import { connect } from 'react-redux';
import './mainBody.css'
import * as actions from '../actions';
import DirChar from'./dirChar'
import { Button, TextField } from '@material-ui/core';

const mapStateToProps = state => {
    return {
        dir: state.auth.dir,
        head: state.auth.head,
        inp:state.auth.mkdir
    };
};

class DirRow extends Component{
    constructor(){
        super()
        this.state={
            fName:"",
        }
    }

    // componentWillMount(){
    //     const data = {
    //         head: this.props.head,
    //         dir: this.props.dir
    //     };
    //     this.props.dirChanged(data);
    // }

    mkdir(){
        const data ={
            name:this.state.fName
        }
        console.log(data)
    }
    onIdChanged(e) {
        this.setState({
            fName:e.target.value
        })
    }
    setInput(){
        this.props.mkdir(true)
    }

    render(){
        const path = this.props.dir.split("/");
        const makeDir = <Button variant="raised" className="dirNew" onClick={this.setInput.bind(this)}>New folder</Button>
        const takeInput =  <div>
        <TextField id="fName" label="folder name" autoComplete="on" value={this.state.fName}onChange={this.onIdChanged.bind(this)}/>
        <Button variant="raised" onClick={this.mkdir.bind(this)}>Submit</Button></div>
        return(
            <div className="dirRow">
                <h3 className="label">Directory -> </h3>
                <div className="dirChar">
                {path.map(function(key,i){
                    return (<DirChar className="dirItem" key={i} n={key}/>);
                })}

                </div>
                {this.props.inp?takeInput:makeDir}
               </div>
        )
    }

}

export default connect(mapStateToProps, actions)(DirRow);
