import React, { Component } from 'react';
import {Button, InputAdornment, IconButton, TextField } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {Visibility, VisibilityOff} from '@material-ui/icons';
import axios from 'axios';
import './mainBody.css';
import * as disAct from '../store/dispatchActions';
import resStore from '../store/ResStore';
import FileMap from './FileMap';

const theme = createMuiTheme({
    overrides: {
      MuiButton: {
        root: {
          background: 'linear-gradient(45deg, #0f0c29, #302b63, #24243e)',
          borderRadius: 3,
          border: 0,
          color: 'white',
          height: 48,
          padding: '0 30px',
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        },
      },
    },
  });
  
export default class MainBody extends Component{
    
    constructor(){
        super();
        this.state={
            devID:"",
            uname:"",
            pswd:"",
            files:"",
            isLogin: false,
            showPassword: false
        }    
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    handleMouseDownPassword = event => {
        event.preventDefault();
    };

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };
    
    onClick(e){
        const data = {
            head:"getList",
            devID:this.state.devID,
            uname:this.state.uname,
            pswd:this.state.pswd,
            dir:this.state.uname,
        }
        if(data.devID === "" || data.uname === "" || data.pswd === "") return;
        axios.post('http://192.168.1.100:5000', data).then(res=>{
            if(res.status === 200){
                const resData = res.data;
                disAct.loggedIn(data);
                this.setState({
                    files: resData,
                    isLogin: true
                });
            }  
        }).catch(error => {
            alert(error);
        });
    }

    componentWillMount(){
        resStore.on("loggedIn",()=>{
            console.log("store working" , resStore.getDir());
        });
    }

    render(){
        const samForm = 
            <div className="wrapper">
                <h2>Login</h2>
                <form className="samForm">
                    <TextField
                        required
                        id="devID"
                        label="Device ID"
                        className="devID"
                        value={this.state.devID}
                        onChange={this.handleChange('devID')}
                        margin="normal" />
                    <TextField
                        required
                        id="uname"
                        label="User Name"
                        className="uname"
                        value={this.state.uname}
                        onChange={this.handleChange('uname')}
                        margin="normal" />
                    <TextField
                        required
                        type={this.state.showPassword ? 'text' : 'password'}
                        id="pswd"
                        label="Password"
                        className="pswd"
                        value={this.state.pswd}
                        onChange={this.handleChange('pswd')}
                        margin="normal" 
                        InputProps={{                        
                            endAdornment: 
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="Toggle password visibility"
                                        onClick={this.handleClickShowPassword}
                                        onMouseDown={this.handleMouseDownPassword} >
                                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                        }} />
                    <MuiThemeProvider theme={theme}>
                        <Button
                            type="submit"
                            style={{marginTop: 20}}
                            variant="contained"
                            color="primary"
                            onClick={this.onClick.bind(this)}>
                                Test
                        </Button>
                    </MuiThemeProvider >
                </form>
            </div>
            
        const replyText = 
            <div>
                <h3>DeviceID: {this.state.devID}</h3>
                <h3>UserName: {this.state.uname}</h3>
                <FileMap data={this.state.files}/>
            </div> 

        return (this.state.isLogin)?replyText:samForm;
    }
}