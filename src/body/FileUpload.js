import React, { Component } from 'react';
import {  Button } from '@material-ui/core';
import * as actions from '../actions';
import { connect } from 'react-redux';
import './card.css'
import axios from 'axios';
import { FilePond, File, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

const mapStateToProps = state => {
    return {
        dir: state.auth.dir,
        err: state.auth.err,
        checked_files: state.auth.checked_files,
        dir_list: state.auth.files
    };
  };

class FileActions extends Component{
    constructor(){
        super()
        this.state={
            files: ['index.html']
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
        console.log(this.props.dir_list)
    }

    handleInit() {
        console.log('FilePond instance has initialised', this.pond);
    }

    
   
    render(){
        return(
            <div className="App">
                {/* Pass FilePond properties as attributes */}
                <FilePond ref={ref => this.pond = ref}
                          allowMultiple={true}
                          //server= {'http://localhost:5000/up/dsa?' + 'dir=' + this.props.dir}
                          instantUpload={false}
                          oninit={() => this.handleInit() }
                          onupdatefiles={(fileItems) => {
                              // Set current file objects to this.state
                              this.setState({
                                  files: fileItems.map(fileItem => fileItem.file)
                              });
                          }}
                          server={{
                            process:(fieldName, file, metadata, load, error, progress, abort) => {
                                let config = {
                                    onUploadProgress: e => progress(e.lengthComputable, e.loaded, e.total)
                                    //console.log(Math.round( (progressEvent.loaded * 100) / progressEvent.total )  
                                }
                                const data = new FormData()
                                data.append('file',file)
                                axios.post('http://localhost:5000/up/encryptedKey?dir='+this.props.dir,data,config).then(res=>{
                                load("JIJI");    
                                console.log(res)})
                                }
                        }}
                          >
                    
                    {/* Update current files  */}
                    {this.state.files.map(file => (
                        <File key={file} src={file} origin="local" />
                    ))}
                    
                </FilePond>
                
            </div>
        )
    }
}

export default connect(mapStateToProps, actions)(FileActions);