import React, { Component } from 'react'
import { connect } from 'react-redux';
import './dirRow.css'
import * as actions from '../actions';
import DirChar from'./dirChar'
import {SelectAll, Sort, CreateNewFolder} from '@material-ui/icons';
import {FaFileUpload} from 'react-icons/fa'
import { Button, Menu, MenuItem, ListItemIcon, ListItemText, Dialog, DialogActions, DialogTitle, DialogContent, RadioGroup, Radio, FormControl, FormControlLabel, FormLabel } from '@material-ui/core';
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
            sortMenuFlag: false
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleFileClick = this.handleFileClick.bind(this)
        this.handleSortChange = this.handleSortChange.bind(this)
    }

    handleClick (event) {
        this.setState({ anchorEl: event.currentTarget });
    }
    
    handleClose (val) {
        switch(val){
            case 1:
            this.props.sAll(this.props.files)
            break
            
            case 2:
            this.setState({ sortMenuFlag: true})
            break

            case 3:
            if(this.state.anchorEl) this.setState({ anchorEl: null})
            break

            default:
            console.log("DirRow -> Invalid val");
        }
        if (this.state.anchorEl) this.setState({anchorEl: null})

    }

    handleFileClick(event, val){
        switch(val){
            case 1:
            this.setState({fileUploadFlag: true})
            break

            case 2:
            if(this.state.fileUploadFlag)this.setState({fileUploadFlag: false})
            break

            case 3:
            console.log("object ", event.target.files[0])
            break
            
            case 4:
            if (this.state.sortMenuFlag) this.setState({sortMenuFlag: false})
            break

            case 5:
            this.setState({sortMenuFlag: true})
            break


            default:
        }
        if (this.state.anchorEl) this.setState({anchorEl: null})
    }

    handleSortChange(val){
        switch(val){
            case 1:
            break
            case 2:
            break
            case 3:
            break
            case 4:
            break
            case 5:
            break
            case 6:
            break
            default:
            break
        }
        if (this.state.sortMenuFlag) this.setState({sortMenuFlag: false})
    }

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
                        variant="contained"
                        aria-owns={anchorEl ? 'simple-menu' : null}
                        aria-haspopup="true"
                        onClick={this.handleClick}>
                        Menu
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={() => this.handleClose(3)}>
                        <MenuItem onClick={ (e) => this.handleClose(1)}>                           
                            <ListItemIcon>
                                <SelectAll/>
                            </ListItemIcon>    
                                <ListItemText inset primary="Select all"/>                        
                        </MenuItem>
                        <MenuItem 
                        onClick={ (e) => this.handleFileClick(e, 5)}>
                            <ListItemIcon>
                                <Sort/>
                            </ListItemIcon>
                            <ListItemText inset primary="Sort"/>
                        </MenuItem>
                        <MenuItem onClick={(e) => this.handleFileClick(e, 6)}>
                            <ListItemIcon>
                                <CreateNewFolder/>
                            </ListItemIcon>
                            <ListItemText inset primary="New folder"/>
                        </MenuItem>
                        <MenuItem onClick={(e) => this.handleFileClick(e, 1)}>
                            <ListItemIcon>
                                <FaFileUpload/>
                            </ListItemIcon>
                            <ListItemText inset primary="Upload files"/>
                        </MenuItem>
                        
                    </Menu>
                    {/*Dialog for File Upload */}
                    <Dialog
                        open={this.state.fileUploadFlag}
                        onClose={(e) => this.handleFileClick(e, 4)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        >
                        <DialogTitle id="alert-dialog-title">Upload files to current directory -> {this.props.dir}</DialogTitle>
                        <DialogContent>
                        {/*<Button
                            variant="contained"
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
                {/*Dialog for Sort */}
                    <Dialog
                        open={this.state.sortMenuFlag}
                        onClose={(e) => this.handleFileClick(e, 4)}
                        aria-labelledby="sort-dialog-title"
                        aria-describedby="sort-dialog-description"
                        >
                        <DialogTitle id="sort-dialog-title">Sort files</DialogTitle>
                        <div className="sortDiv">
                        <div className="sort">
                        <FormControl>
                                <FormLabel>
                                    Alphabetical
                                </FormLabel>
                                <RadioGroup
                                    aria-label="AlphaSort"
                                    name="alphasort"
                                >
                                <FormControlLabel value="a-z" onClick={() => this.handleSortChange(1)} control={<Radio />} label="A-Z" />
                                <FormControlLabel value="z-a" onClick={() => this.handleSortChange(2)}control={<Radio />} label="Z-A" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div className="sort">
                            <FormControl>
                                <FormLabel>
                                    Size
                                </FormLabel>
                                <RadioGroup
                                    aria-label="AlphaSort"
                                    name="alphasort"
                                    value={this.state.sortValue}
                                    onChange={this.handleSortChange}
                                >
                                <FormControlLabel value="a-z" onClick={() => this.handleSortChange(3)} control={<Radio />} label="A-Z" />
                                <FormControlLabel value="z-a" onClick={() => this.handleSortChange(4)}control={<Radio />} label="Z-A" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div className="sort">
                            <FormControl>
                                <FormLabel>
                                    Date updated
                                </FormLabel>
                                <RadioGroup
                                    aria-label="AlphaSort"
                                    name="alphasort"
                                    value={this.state.sortValue}
                                    onChange={this.handleSortChange}
                                >
                                <FormControlLabel value="a-z" onClick={() => this.handleSortChange(5)} control={<Radio />} label="A-Z" />
                                <FormControlLabel value="z-a" onClick={() => this.handleSortChange(6)} control={<Radio />} label="Z-A" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        </div>
                        <DialogActions>
                            <Button variant="contained" onClick={(e) => this.handleFileClick(e, 4)} color="primary">
                            Ok
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            
            </div>
        )
    }

}

export default connect(mapStateToProps, actions)(DirRow);
