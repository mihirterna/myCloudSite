import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../actions';
import DirChar from './dirChar'
import { SelectAll, Sort, CreateNewFolder } from '@material-ui/icons';
import { FaFileUpload } from 'react-icons/fa'
import {
    Button,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    RadioGroup,
    Radio,
    FormControl,
    FormControlLabel,
    FormLabel
} from '@material-ui/core';
import { notify } from 'react-notify-toast';
import FileUpload from './FileUpload';
import '../CSS/dirRow.css';

const mapStateToProps = state => {
    return {
        dir: state.file.dir,
        head: state.file.head,
        inp: state.file.mkdir,
        files: state.file.files,
        sAllFlag: state.file.sAllFlag
    };
};

class DirRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fName: "",
            anchorEl: null,
            fileUploadFlag: false,
            sortMenuFlag: false
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleFileClick = this.handleFileClick.bind(this)
        this.handleSortChange = this.handleSortChange.bind(this)
    }

    handleClick(event) {
        this.setState({ anchorEl: event.currentTarget });
    }

    handleClose(val) {
        switch (val) {
            case 1:
                this.props.sAll(this.props.files)
                break

            case 2:
                this.setState({ sortMenuFlag: true })
                break

            case 3:
                if (this.state.anchorEl) this.setState({ anchorEl: null })
                break

            default:
                console.log("DirRow -> Invalid val");
        }
        if (this.state.anchorEl) this.setState({ anchorEl: null })

    }

    handleFileClick(event, val) {
        switch (val) {
            case 1:
                this.setState({ fileUploadFlag: true })
                break

            case 2:
                console.log("handleFIleCLick ")
                if (this.state.fileUploadFlag) {
                    console.log("making dir req");
                    this.props.dirChanged(this.props.dir)
                    this.setState({ fileUploadFlag: false })
                }
                break

            case 3:
                console.log("object ", event.target.files[0])
                break

            case 4:
                if (this.state.sortMenuFlag) this.setState({ sortMenuFlag: false })
                break

            case 5:
                this.setState({ sortMenuFlag: true })
                break

            case 6:
                let folderName = prompt("Enter folder name").trim();
                if(!folderName) {
                    notify.show('Enter valid folder name!', 'error', 3000);
                    break;
                }
                this.props.createFolder(`${this.props.dir}/${folderName}`, (done) => {
                    if(done) notify.show('Folder created successfully!', 'success');
                    else notify.show('Folder creation failure!', 'error');
                });
                break;
            default:
        }
        if (this.state.anchorEl) this.setState({ anchorEl: null })
    }

    handleSortChange(val) {
        switch(val){
            case 1:
            this.props.sort(1, this.props.files)
            break
            case 2:
            this.props.sort(2, this.props.files)
            break
            case 3:
            this.props.sort(3, this.props.files)
            break
            case 4:
            this.props.sort(4, this.props.files)
            break
            case 5:
            this.props.sort(5, this.props.files)
            break
            case 6:
            this.props.sort(6, this.props.files)
            break
            default:
        }
        if (this.state.sortMenuFlag) this.setState({ sortMenuFlag: false })
    }

    render() {
        const path = this.props.dir.split("/");
        const { anchorEl } = this.state;
        console.log(this.props.sAllFlag);
        return (
            <div className="dirRow">
                <h3 className="label">Directory -> </h3>
                <div className="dirChar">
                    {path.map(function (key, i) {
                        if (i !== 0) {
                            return (<DirChar className="dirItem" key={i} n={key} />);
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
                        <MenuItem onClick={(e) => this.handleClose(1)}>
                            <ListItemIcon>
                                <SelectAll />
                            </ListItemIcon>
                            {this.props.sAllFlag?<ListItemText inset primary="Unselect all" />:<ListItemText inset primary="Select all"/>}
                        </MenuItem>
                        <MenuItem
                            onClick={(e) => this.handleFileClick(e, 5)}>
                            <ListItemIcon>
                                <Sort />
                            </ListItemIcon>
                            <ListItemText inset primary="Sort" />
                        </MenuItem>
                        <MenuItem onClick={(e) => this.handleFileClick(e, 6)}>
                            <ListItemIcon>
                                <CreateNewFolder />
                            </ListItemIcon>
                            <ListItemText inset primary="New folder" />
                        </MenuItem>
                        <MenuItem onClick={(e) => this.handleFileClick(e, 1)}>
                            <ListItemIcon>
                                <FaFileUpload />
                            </ListItemIcon>
                            <ListItemText inset primary="Upload files" />
                        </MenuItem>

                    </Menu>
                    {/*Dialog for File Upload */}
                    <Dialog
                        open={this.state.fileUploadFlag}
                        onClose={(e) => this.handleFileClick(e, 2)}
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
                            <FileUpload />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={(e) => this.handleFileClick(e, 2)} color="primary" autoFocus>
                                Okay
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
                                        <FormControlLabel value="a-z" onClick={() => this.handleSortChange(1)} control={<Radio />} label="A->Z" />
                                        <FormControlLabel value="z-a" onClick={() => this.handleSortChange(2)} control={<Radio />} label="Z->A" />
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
                                        <FormControlLabel value="Small-Big" onClick={() => this.handleSortChange(3)} control={<Radio />} label="Small->Big" />
                                        <FormControlLabel value="Big-Small" onClick={() => this.handleSortChange(4)} control={<Radio />} label="Big->Small" />
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
                                        <FormControlLabel value="Old-New" onClick={() => this.handleSortChange(5)} control={<Radio />} label="Old->New" />
                                        <FormControlLabel value="New-Old" onClick={() => this.handleSortChange(6)} control={<Radio />} label="New->Old" />
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
