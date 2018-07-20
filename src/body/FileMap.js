import React, { Component } from 'react';
import Card from './card';
import * as actions from '../actions';
import { connect } from 'react-redux';
import DirRow from './dirRow'

const mapStateToProps = state => {
    return {
        files: state.auth.files,
        dir: state.auth.dir,
        head: state.auth.head,
        err: state.auth.err
    };
};

class FileMap extends Component{

   

    alertError(){
        if(this.props.err) console.log(this.props.err);
    }

    render(){
        var d = this.props.files;
         return(
            <div>
                <DirRow />
                {Object.keys(d).map(function(key){
                    return <div key={key}><Card  n={d[key]["name"]} t={d[key]["type"]} s={d[key]["size"]} la={d[key]["la"]} lm={d[key]["lm"]} birth={d[key]["birth"]}/></div>
                })}
            </div>
         );
    }
}

export default connect(mapStateToProps, actions)(FileMap);
