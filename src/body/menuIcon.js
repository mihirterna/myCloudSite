import React, { Component } from 'react';
import {IconButton, Menu, MenuItem,ListItemIcon,ListItemText} from '@material-ui/core';
import {MoreVert,} from '@material-ui/icons'
import * as actions from '../actions';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { FaFileDownload, FaShareAlt } from 'react-icons/fa'

const mapStateToProps = state => {
    return {
        files: state.auth.files,
        dir: state.auth.dir,
        head: state.auth.head,
        err: state.auth.err,
        cb_val : state.auth.cb_val
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
  
  
  class Menuicon extends Component {
      constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.download = this.download.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.state = {
            anchorEl: null,
            classes: props
          }
        
      }

    handleClick(event) {
        this.setState({ anchorEl: event.currentTarget });
    }
    handleClose(){
        this.setState({ anchorEl: null });
      };
    download(){
        var data = {
        head:"download",
        dir:this.props.dir,
        fName:this.props.n
                  }
        const url = "http://localhost:5000/dw/d?dir="+this.props.dir+"&f="+data.fName
        window.location.href = url
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
              <MenuItem className={this.state.classes.menuItem}>
          <ListItemIcon className={this.state.classes.icon}>
            <FaShareAlt />
          </ListItemIcon>
          <ListItemText classes={{ primary: this.state.classes.primary }} inset primary="Share download link" />
        </MenuItem>
        <MenuItem className={this.state.classes.menuItem} onClick={this.download}>
          <ListItemIcon className={this.state.classes.icon}>
            <FaFileDownload />
          </ListItemIcon>
          <ListItemText classes={{ primary: this.state.classes.primary }} inset primary="Download" />
        </MenuItem>
                </Menu>
            </div>
        )
    }
}

export default connect(mapStateToProps, actions)(withStyles(styles)(Menuicon));