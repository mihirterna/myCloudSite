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

    constructor(props){
        super(props)
        this.state={
            fName: props.n,
        }
    }

    // onClick(){
    //     var path = this.props.dir.split("/");
    //     this.props.headChanged("getList");
    //     const data = {
    //         head: this.props.head,
    //         dir: path.slice(0, path.indexOf(this.state.fName)+1).join("/")
    //     };
    //     this.props.dirChanged(data);
    // }

    componentWillReceiveProps(newProp){
        this.setState({fName:newProp.n});
    }

    render(){
        return(
            <div>
                <Button variant="outlined" /*onClick={this.onClick.bind(this)}*/>{this.state.fName}/</Button>
            </div>
        );
    }
};

export default connect(mapStateToProps, actions)(DirChar);
