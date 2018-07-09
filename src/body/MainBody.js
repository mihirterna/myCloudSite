import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import './mainBody.css';
import * as disAct from '../store/dispatchActions';
import resStore from '../store/ResStore';

export default class MainBody extends Component{
    
    constructor(){
        super();
        this.state={
            devID:"",
            uname:"",
            pswd:"",
            files:[],
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
           var resData = res.data.data; 
          if(res.data.data !== null){
            console.log(res.data.data);
            this.setState({files:res.data.data});
            disAct.loggedIn(data);
        }  
          });

      }
      componentWillMount(){
          
        resStore.on("loggedIn",()=>{
            console.log("store working");
            this.setState({
                isLogin:true
            })
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

        <h1>ITS WORKING</h1>

</div> 

if(!this.state.isLogin){
    return (samForm);
}
if(this.state.isLogin){
    return(replyText);
}
}
}