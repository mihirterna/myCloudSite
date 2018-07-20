import React, { Component } from 'react'
import { connect } from 'react-redux';
import './mainBody.css'
import * as actions from '../actions';
import DirChar from'./dirChar'

const mapStateToProps = state => {
    return {
        dir: state.auth.dir,
        head: state.auth.head
    };
};

class DirRow extends Component{

    // componentWillMount(){
    //     const data = {
    //         head: this.props.head,
    //         dir: this.props.dir
    //     };
    //     this.props.dirChanged(data);
    // }

    render(){
        var path = this.props.dir.split("/");
        return(
            <div className="dirRow">
                <h2 className="label">Directory -> </h2>
                <div className="dirChar">
                {path.map(function(key,i){
                    return (<DirChar key={i} n={key}/>);
                })}
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, actions)(DirRow);
