import React, { Component } from 'react';
import { Typography, CardContent, Button, Card } from '@material-ui/core';
import * as actions from '../actions';
import { connect } from 'react-redux';
import './card.css'
import axios from 'axios';

const mapStateToProps = state => {
    return {
        dir: state.auth.dir,
        err: state.auth.err
    };
  };

class FileUpload extends Component{
    constructor(){
        super()
        this.state={
            files:null
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
        Array.from(this.state.files).forEach(file => {
            const data = new FormData()
            data.append('upload',file,file.name)
            axios.post('http://192.168.31.91:5000',{data}).then(res=>{
                console.log(res)
              })
        })
        // const data={
        //     head:"upload",
        //     dir:this.props.dir,
        //     files:this.state.files
        //   }
    }
    render(){
        return(
            <div>
                <form onSubmit={this.upload}>
               <input type="file" name="file" onChange={this.onDrop} multiple/>
               <input type="submit" value="submit"/>
               </form>
            </div>
        )
    }
}

export default connect(mapStateToProps, actions)(FileUpload);