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
        this.selectAll = this.selectAll.bind(this)
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
        const config = {
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
    selectAll(){
        console.log("TODO: select/unselect all files")
    }


    render(){
        return(
            <div className="fileUp">
            <div>
                <form onSubmit={this.upload}>
               <input type="file" name="file" onChange={this.onDrop} multiple/>
               <input type="submit" value="submit"/>
               </form>
            </div>
            <div>
                <Button variant="raised" onClick={this.selectAll}>Select all</Button>
            </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, actions)(FileUpload);