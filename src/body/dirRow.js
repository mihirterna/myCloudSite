import React, { Component } from 'react'
import { connect } from 'react-redux';
import './mainBody.css'
import * as actions from '../actions';
import DirChar from'./dirChar'
import {SelectAll, Sort, CreateNewFolder} from '@material-ui/icons';
import { Button, Menu, MenuItem, ListItemIcon, ListItemText, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core';
import FileUpload from './FileUpload';

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
            anchorEl: null,
            fileUploadFlag: false,
            sortMenuFlag: null
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleFileClick = this.handleFileClick.bind(this)
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
    
    handleClose (val) {
        switch(val){
            case 1:
            this.props.sAll(this.props.files)
            break
            
            case 2:
            this.setState({ sortMenuFlag: true})
            break

            default:
            console.log("DirRow -> Invalid val");
        }
        this.state.anchorEl?this.setState({ anchorEl: null }):null
    };
    
    handleFileClick(event, val){
        switch(val){
            case 1:
            this.setState({fileUploadFlag: true})
            break

            case 2:
            this.state.fileUploadFlag? this.setState({fileUploadFlag: false}): null
            break

            case 3:
            console.log("object ", event.target.files[0])
            break

            default:
        }
    }

    render(){
        const path = this.props.dir.split("/");
        const { anchorEl, sortMenuFlag } = this.state;

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
                        <MenuItem onClick={ () => this.handleClose(1)}>                           
                            <ListItemIcon>
                                <SelectAll/>
                            </ListItemIcon>    
                                <ListItemText inset primary="Select all"/>                        
                        </MenuItem>
                        <MenuItem 
                        aria-owns={sortMenuFlag ? 'sort-menu' : null}
                        aria-haspopup="true"
                        onClick={ () => this.handleClose(2)}>
                            <ListItemIcon>
                                <Sort/>
                            </ListItemIcon>
                            <ListItemText inset primary="Sort"/>
                        </MenuItem>
                        <MenuItem onClick={(e) => this.handleFileClick(e, 1)}>
                            <ListItemIcon>
                                <CreateNewFolder/>
                            </ListItemIcon>
                            <ListItemText inset primary="New folder"/>
                        </MenuItem>
                    </Menu>
                    <Dialog
                        open={this.state.fileUploadFlag}
                        onClose={(e) => this.handleFileClick(e, 4)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        >
                        <DialogTitle id="alert-dialog-title">Upload files to current directory -> {this.props.dir}</DialogTitle>
                        <DialogContent>
                        {/*<Button
                            variant="raised"
                            containerelement='label'
                            label='Select files'>
                             <input name="files" id="files" type="file" onChange={(e) => this.handleFileClick(e, 3)} multiple /> 
                             </Button>
                             */}
                        <FileUpload/>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={(e) => this.handleFileClick(e, 2)} color="primary">
                            Disagree
                            </Button>
                            <Button onClick={(e) => this.handleFileClick(e, 2)} color="primary" autoFocus>
                            Agree
                            </Button>
                        </DialogActions>
                    </Dialog>
                    {/* For sort menu 
                    <Menu
                        id="sort-menu"
                        anchorEl={sortMenuFlag}
                        open={Boolean(anchorEl)}
                        onClose={this.handleClose}>
                        <MenuItem onClick={ () => this.handleClose(1)}>                           
                            <ListItemIcon>
                                <SelectAll/>
                            </ListItemIcon>    
                                <ListItemText inset primary="Select all"/>                        
                        </MenuItem>
                        <MenuItem 
                        aria-owns={sortMenuFlag ? 'sort-menu' : null}
                        aria-haspopup="true"
                        onClick={ () => this.handleClose(2)}>
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
                    </Menu> */}
                </div>
            
            </div>
        )
    }

}

export default connect(mapStateToProps, actions)(DirRow);
