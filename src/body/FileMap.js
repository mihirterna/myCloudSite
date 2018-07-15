import React, { Component } from 'react';
import Card from './card'
import * as disAct from '../store/dispatchActions';
import resStore from '../store/ResStore';
import axios from 'axios'
import DirRow from './dirRow'

export default class FileMap extends Component{
    constructor(props){
        super(props);
        this.state={
            //files:this.props.data
            files:props.data
        };
    }
    componentWillMount(){
        resStore.on("dirChanged",()=>{
        var directory = resStore.getDir()
        var data = {
            head:"getList",
            dir:directory
        }
        axios.post('http://192.168.31.91:5000',{data}).then(res=>{
            var s = "status"
          if(res[s]===200){
            var resData = res.data;
             this.setState({
                 files:resData
             })
        }
        })
        });
    }

    render(){
        var d = this.state.files;
         return(
             <div>
                 < DirRow/>
                  { Object.keys(d).map(function(key){
                   return <div key={key}><Card  n={d[key]["name"]} t={d[key]["type"]} s={d[key]["size"]} la={d[key]["la"]} lm={d[key]["lm"]} birth={d[key]["birth"]}/></div>
                   })}
                    </div>
         );
    }
}
