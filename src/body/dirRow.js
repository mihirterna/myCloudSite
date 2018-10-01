import React, { Component } from 'react'
import { connect } from 'react-redux';
import './mainBody.css'
import * as actions from '../actions';
import DirChar from'./dirChar'
import {SelectAll, Sort, CreateNewFolder} from '@material-ui/icons';
import { Button, Menu, MenuItem, ListItemIcon, ListItemText } from '@material-ui/core';

const mapStateToProps = state => {
    return {
        dir: state.auth.dir,
        head: state.auth.head,
        inp:state.auth.mkdir,
        files: state.auth.files
    };
};

class DirRow extends Component{
    constructor(){
        super()
        this.state={
            fName:"",
            anchorEl: null
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    mkdir(){
        const data ={
            name:this.state.fName
        }
        console.log(data)
    }
    
    onIdChanged(e) {
        this.setState({
            fName:e.target.value
        })
    }
    setInput(){
        this.props.mkdir(true)
    }

    handleClick (event) {
        this.setState({ anchorEl: event.currentTarget });
    };
    
    handleClose () {
        this.setState({ anchorEl: null });
    };    

    render(){
        const path = this.props.dir.split("/");
        const { anchorEl } = this.state;

        return(
            <div className="dirRow">
                <h3 className="label">Directory -> </h3>
                <div className="dirChar">
                {path.map(function(key,i){
                    if(i!==0){
                    return (<DirChar className="dirItem" key={i} n={key}/>);
                    }
                    else {
                       return null //Do nothing
                    }
                })}
                </div>
                <div>
                    <Button
                        variant="raised"
                        aria-owns={anchorEl ? 'simple-menu' : null}
                        aria-haspopup="true"
                        onClick={this.handleClick}>
                        Menu
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={this.handleClose}>
                        <MenuItem onClick={ () => this.props.sAll(this.props.files)}>                           
                            <ListItemIcon>
                                <SelectAll/>
                            </ListItemIcon>    
                                <ListItemText inset primary="Select all"/>                        
                        </MenuItem>
                        <MenuItem onClick={ () => this.props.sAll("HELLO")}>
                            <ListItemIcon>
                                <Sort/>
                            </ListItemIcon>
                            <ListItemText inset primary="Sort"/>
                        </MenuItem>
                        <MenuItem onClick={ () => this.props.sAll("HELLO")}>
                            <ListItemIcon>
                                <CreateNewFolder/>
                            </ListItemIcon>
                            <ListItemText inset primary="New folder"/>
                        </MenuItem>
                    </Menu>
                </div>
            </div>
        )
    }

}

export default connect(mapStateToProps, actions)(DirRow);
