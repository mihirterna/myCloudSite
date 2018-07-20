import React, { Component } from 'react';
import { Typography, CardContent, Button, Card } from '@material-ui/core';
import * as actions from '../actions';
import { connect } from 'react-redux';
import './card.css'
import axios from 'axios';
import Dropzone from 'react-dropzone'

const mapStateToProps = state => {
    return {
        dir: state.auth.dir,
        err: state.auth.err
    };
  };

class FileUpload extends Component{
    constructor(){
        super()
        this.onDrop = this.onDrop.bind(this)
    }
    onDrop(file){
        file.forEach(file => {
        console.log(file.name)
        var data={
          head:"upload",
          dir:this.props.dir,
          file:file
        }
        axios.post('http://192.168.31.91:5000',{data}).then(res=>{

        })
        })
    }
    render(){
        return(
            <div>
               <Dropzone onDrop={(files) => this.onDrop(files)} style={{height:'14px'}}> 
                <h3>Drop files</h3>
                </Dropzone>
            </div>
        )
    }
}

export default connect(mapStateToProps, actions)(FileUpload);