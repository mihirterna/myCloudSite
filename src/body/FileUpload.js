import React, { Component } from 'react';
import { Typography, CardContent, Button, Card } from '@material-ui/core';
import * as actions from '../actions';
import { connect } from 'react-redux';
import './card.css'
import axios from 'axios';

const mapStateToProps = state => {
    return {
        dir: state.auth.dir,
        err: state.auth.err,
        checked_files: state.auth.checked_files
    };
  };

class FileActions extends Component{
    constructor(){
        super()
        this.state={
            files:[],
        }
        this.onDrop = this.onDrop.bind(this)
        this.upload = this.upload.bind(this)
    }
    onDrop(event){
        this.setState({
            files: event.target.files
        })
        Array.from(event.target.files).forEach(file => {
        console.log(file.name)
    })
    }
    upload (event){
        event.preventDefault()
        let config = {
            onUploadProgress: progressEvent => console.log(Math.round( (progressEvent.loaded * 100) / progressEvent.total ))
        }
        Array.from(this.state.files).forEach(file => {
            const data = new FormData()
            data.append('file',file)
            axios.post('http://localhost:5000/up/encryptedKey?dir='+this.props.dir,data,config).then(res=>{
                const data = {
                    dir : this.props.dir
                }
                this.props.dirChanged(data)
                console.log(res)
              })
        })
        // const data={
        //     head:"upload",
        //     dir:this.props.dir,
        //     files:this.state.files
        //   }
    }
    componentWillReceiveProps(newProp){
        this.props=newProp
    }
    onSelect(){
        console.log(this.props.checked_files)

    }
   
    render(){
        console.log(this.props.checked_files)
        return(
            <div className="fileUp">
                <Button
                variant="raised"
                onClick={this.onSelect.bind(this)}
                >
                {this.props.checked_files}
                </Button>
            </div>
        )
    }
}

export default connect(mapStateToProps, actions)(FileActions);