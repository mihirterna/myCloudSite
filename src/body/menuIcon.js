import React, { Component } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button
}
  from '@material-ui/core';
import { MoreVert, } from '@material-ui/icons'
import * as actions from '../actions';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { FaFileDownload, FaShareAlt, FaEdit } from 'react-icons/fa'
import { notify } from 'react-notify-toast';


const mapStateToProps = state => {
  return {
    dir: state.file.dir,
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
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.menuActions = this.menuActions.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      anchorEl: null,
      classes: props,
      fileName: false,
      name: ""
    }

  }

  handleClick(event) {
    this.setState({ anchorEl: event.currentTarget });
  }
  handleClose() {
    this.setState({ anchorEl: null });
  };
  handleChange = (event) => {
    this.setState({ name: event.target.value })
  }

  menuActions(val) {
    switch (val) {
      case 1:
        this.setState({ fileName: true, name: this.props.n })

        //   let folderName = prompt("Enter new name").trim();
        //   if(!folderName) {
        //       notify.show('Enter valid folder name!', 'error', 3000);
        //       break;
        //   }
        //   const data = {
        //     dir: this.props.dir,
        //     oldName: this.props.n,
        //     newName: folderName
        //   }
        //   this.props.rename(data, (done) => {
        //     if(done) notify.show('Renamed successfully!', 'success');
        //     else notify.show('Rename failure!', 'error');
        // });
        break
      case 2:
        break
      case 3:
        const url = "http://localhost:5000/dw/JWTSecretKey?dir=" + this.props.dir + "&f=" + this.props.n
        window.location.href = url

        // var form = document.createElement('form');
        // document.body.appendChild(form);
        // form.method = 'post';
        // form.action = url;
        //     var input = document.createElement('input');
        //     input.type = 'hidden';
        //     input.name = this.props.n;
        //     input.value = this.props.dir;
        //     form.appendChild(input);

        // form.submit();

        break
      case 4:
        if (this.state.name === "") {
          notify.show('Enter valid name')
          break
        }
        const data = {
          dir: this.props.dir,
          oldName: this.props.n,
          newName: this.state.name
        }
        this.props.rename(data, (done) => {
          if (done) notify.show('Renamed successfully!', 'success');
          else notify.show('Rename failure!', 'retry');
        });
        if (this.state.anchorEl) this.setState({ anchorEl: null })

        break
      case 5:
        if (this.state.fileName) this.setState({ fileName: false })
        if (this.state.anchorEl) this.setState({ anchorEl: null })

        break
      default:
    }
  }


  render() {
    const { anchorEl } = this.state;
    return (
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
            },
          }}>
          <MenuItem className={this.state.classes.menuItem} onClick={() => this.menuActions(1)}>
            <ListItemIcon className={this.state.classes.icon}>
              <FaEdit />
            </ListItemIcon>
            <ListItemText classes={{ primary: this.state.classes.primary }} inset primary="Rename" />
          </MenuItem>

          <Dialog
            open={this.state.fileName}
            onClose={(e) => this.menuActions(5)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Rename Dialog</DialogTitle>
            <DialogContent>
              <TextField
                id="standard-name"
                label="New filename"
                value={this.state.name}
                onChange={this.handleChange}
                margin="normal" />
            </DialogContent>
            <DialogActions>
              <Button onClick={(e) => this.menuActions(4)} color="primary" autoFocus>
                Okay
                            </Button>
            </DialogActions>
          </Dialog>

          <MenuItem className={this.state.classes.menuItem} onClick={() => this.menuActions(2)}>
            <ListItemIcon className={this.state.classes.icon}>
              <FaShareAlt />
            </ListItemIcon>
            <ListItemText classes={{ primary: this.state.classes.primary }} inset primary="Share download link" />
          </MenuItem>
          <MenuItem className={this.state.classes.menuItem} onClick={() => this.menuActions(3)}>
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