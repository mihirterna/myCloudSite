import React, { Component } from 'react';
import {IconButton, 
  Menu, 
  MenuItem,
  ListItemIcon,
  ListItemText, 
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button} 
  from '@material-ui/core';
import {MoreVert,} from '@material-ui/icons'
import * as actions from '../actions';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { FaFileDownload, FaShareAlt, FaEdit } from 'react-icons/fa';
import { notify } from 'react-notify-toast';


const mapStateToProps = state => {
    return {
        files: state.file.files,
        dir: state.file.dir,
        checkedFiles: state.file.checked_files
    };
  };

  const styles = theme => ({
    menuItem: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& $primary, & $icon': {
          color: theme.palette.common.white,
        },
      },
    },
    primary: {},
    icon: {},
  });

  const ITEM_HEIGHT = 48;
  
  
  class MenuFolderIcon extends Component {
      constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.menuActions = this.menuActions.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            anchorEl: null,
            classes: props,
            name:"",
            renameDialog: false,
            shareLinkDialog: false
          }
        
      }

    handleClick(event) {
      this.setState({ anchorEl: event.currentTarget })
    }

    handleClose(){
      this.setState({ anchorEl: null })
    }
    
    handleChange(event){
      this.setState({ name: event.target.value})
    }

    menuActions(val){
      switch(val){
        case 1:
          if(this.state.renameDialog){this.setState({renameDialog: false})}
          
          // let folderName = prompt("Enter new name").trim();
          // if(!folderName) {
          //     notify.show('Enter valid folder name!', 'error', 3000);
          //     break;
          // }
          const data1 = {
            dir: this.props.dir,
            oldName: this.props.n,
            newName: this.state.name
          }
          this.props.rename(data1, (done) => {
            if(done) notify.show('Renamed successfully!', 'success');
            else notify.show('Rename failure!', 'error');
          });
        break

        case 2:
        const data2 = {
          dir : this.props.dir,
          cfs : this.props.checkedFiles,
          zipName : this.state.name
        }
        this.props.shareDownloadLink(data2)
        break

        case 3:
        const data3 = {
          dir : this.props.dir,
          cfs : this.props.n,
          zipName : this.props.n
        }
        this.props.downloadZip(data3)
        break

        case 4:
        break

        case 5:
        break

        default:
      }
    }

    render(){
        const { anchorEl } = this.state;
        return(
        <div>
            <IconButton
              aria-label="More"
              aria-owns={anchorEl ? 'long-menu' : null}
              aria-haspopup="true"
              onClick={this.handleClick}>
              <MoreVert />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
              PaperProps={{
                  style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: 200,
                  },}}>
              <MenuItem className={this.state.classes.menuItem} onClick={()=> this.setState({renameDialog: true})}>
                <ListItemIcon className={this.state.classes.icon}>
                  <FaEdit />
                </ListItemIcon>
                <ListItemText classes={{ primary: this.state.classes.primary }} inset primary="Rename" />
              </MenuItem>
              
              <Dialog
                        open={this.state.renameDialog}
                        onClose={(e) => this.menuActions(5)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogContent>
                            <TextField
                                id="standard-name"
                                label="New filename"
                                value={this.state.name}
                                onChange={this.handleChange}
                                margin="normal"/>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={(e) => this.menuActions(1)} color="primary" autoFocus>
                                Okay
                            </Button>
                        </DialogActions>
                </Dialog>

              <MenuItem className={this.state.classes.menuItem} onClick={()=> this.setState({shareLinkDialog: true})}>
                <ListItemIcon className={this.state.classes.icon}>
                  <FaShareAlt />
                </ListItemIcon>
                <ListItemText classes={{ primary: this.state.classes.primary }} inset primary="Zip and share download link" />
              </MenuItem>

              <Dialog
                        open={this.state.shareLinkDialog}
                        onClose={(e) => this.menuActions(5)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">Number of select files => {this.props.checkedFiles.length}</DialogTitle>
                        <DialogContent>
                            <TextField
                                id="standard-name"
                                label="Zip file name"
                                value={this.state.name}
                                onChange={this.handleChange}
                                margin="normal"/>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={(e) => this.menuActions(2)} color="primary" autoFocus>
                                Okay
                            </Button>
                        </DialogActions>
                </Dialog>

              <MenuItem className={this.state.classes.menuItem} onClick={()=> this.menuActions(3)}>
                <ListItemIcon className={this.state.classes.icon}>
                  <FaFileDownload />
                </ListItemIcon>
                <ListItemText classes={{ primary: this.state.classes.primary }} inset primary="Zip and download" />
              </MenuItem>

              </Menu>
            </div>
        )
    }
}

export default connect(mapStateToProps, actions)(withStyles(styles)(MenuFolderIcon));