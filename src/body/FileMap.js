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
        var d = JSON.parse(JSON.stringify(this.props.data));
        console.log(d);
        // var usersWithName = Object.keys(d).map(function(key) {
        //     var user = d[key];
        //     user.name = key;
        //     return user;
        //   });
         
    
         return(
             <div>
               {
                   Object.keys(d).map(function(key,i){
                       var k = 1 + i; 
                   return <div><Card n={d[key][k]} i={i}/></div>
                   })}
                   
                                 </div>
         );
    }
}