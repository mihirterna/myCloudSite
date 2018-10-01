import React, { Component } from 'react';
import {Button} from '@material-ui/core';
import * as actions from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        dir: state.auth.dir
    };
};

class DirChar extends Component{

    onClick(){
        let path = this.props.dir.split("/");
        console.log(path)
        const data = {
            head: "getList", //head: undefined even if  this.props.headChanged("getList");
            dir: path.slice(0, path.indexOf(this.props.n)+1).join("/")
        };
        this.props.dirChanged(data);
    }

    componentWillReceiveProps(newProp){
       this.props=newProp
    }

    render(){
        return(
            <div>
                <Button variant="raised" onClick={this.onClick.bind(this)}>{this.props.n}/</Button>
            </div>
        );
    }
};

export default connect(mapStateToProps, actions)(DirChar);
