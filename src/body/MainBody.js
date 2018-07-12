import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import './mainBody.css';
import * as disAct from '../store/dispatchActions';
import resStore from '../store/ResStore';
import FileMap from './FileMap';

export default class MainBody extends Component{
    
    constructor(){
        super();
        this.state={
            devID:"",
            uname:"",
            pswd:"",
            files:"",
            isLogin:false
        }    
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };

    
      onClick(e){
        const data = {
            devID:this.state.devID,
            uname:this.state.uname,
            pswd:this.state.pswd
        }
        console.log("Button Clicked",this.state.devID,this.state.uname,this.state.pswd);
        axios.post('http://localhost:5000',{data}).then(res=>{
           // const req = JSON.parse(res);
            
           var s = "status"
           console.log(res[s])
          if(res[s]===200){
            var resData = res.data;
            console.log(res);
            disAct.loggedIn(data);
            console.log("IsLogin set to true");
            this.setState({
                files:resData,
                isLogin:true
            })
        }  
          });

      }
      componentWillMount(){
        resStore.on("loggedIn",()=>{
            console.log("store working");
        });
      }

      render(){
        var samForm = 
        <form className="samForm">
        <TextField
      id="devID"
      label="Device ID"
      className="devID"
      value={this.state.devID}
      onChange={this.handleChange('devID')}
      margin="normal"
    /><TextField
    id="uname"
    label="User Name"
    className="uname"
    value={this.state.uname}
    onChange={this.handleChange('uname')}
    margin="normal"
  />
  <TextField
  id="pswd"
  label="Password"
  className="pswd"
  value={this.state.pswd}
  onChange={this.handleChange('pswd')}
  margin="normal"
/>
<Button variant="contained" color="primary" onClick={this.onClick.bind(this)}>Test</Button></form>

var replyText = <div>

        <h3>DeviceID: {this.state.devID}</h3><h3>UserName: {this.state.uname}</h3>
        <FileMap data={this.state.files}/>
        

</div> 

if(!this.state.isLogin){
    return (samForm);
}
if(this.state.isLogin){
    return(replyText);
}
}
}