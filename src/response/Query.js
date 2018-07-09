import React, { Component } from 'react';
import axios from 'axios';

export default class Query extends Component{
    constructor(){
        super();
        this.state={
            devID:"",
            uname:"",
            pswd:"",
            files:[]
        }
    }

    onClick(e){
        const data = {
            devID:this.state.devID,
            uname:this.state.uname,
            pswd:this.state.pswd
        }
        
        console.log("Button Clicked",this.state.devID,this.state.uname,this.state.pswd);

        axios.post('http://18.221.120.253:3000',{data}).then(res=>{
           // const req = JSON.parse(res);
            console.log(res.data.data);
           // console.log(req);
           this.setState({files:res.data.data});
          })

    }

    render(){
        return(
            <ul></ul>
        )
    }

}