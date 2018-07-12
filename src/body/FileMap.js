import React, { Component } from 'react';
import Card from './card'

export default class FileMap extends Component{
    constructor(){
        super();
        this.state={
            //files:this.props.data
            files:""
        };
    }
    render(){
        var d = this.props.data;
        console.log(d);
        // var usersWithName = Object.keys(d).map(function(key) {
        //     var user = d[key];
        //     user.name = key;
        //     return user;
        //   });
         
    
         return(
             <div>
               {
                   Object.keys(d).map(function(key){
                   return <div><Card n={d[key]["name"]} s={d[key]["size"]} t={d[key]["type"]}/></div>
                   })}
                   
                                 </div>
         );
    }
}