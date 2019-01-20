import React, { Component } from 'react'
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
    from '@material-ui/core'
import { MoreVert, } from '@material-ui/icons'
import * as actions from '../actions'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { FaFileDownload, FaShareAlt } from 'react-icons/fa'


const mapStateToProps = state => {
    return {
        files: state.file.files,
        dir: state.file.dir,
        checkedFiles: state.file.checked_files,
        download_link: state.file.download_link
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


class MenuMultiFileIcon extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.menuActions = this.menuActions.bind(this)
        this.handleClose = this.handleClose.bind(this)
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

    menuActions(val) {
        switch (val) {
            case 1:
                this.setState({ fileName: true })
                break

            case 2:
                const data3 = {
                    dir: this.props.dir,
                    cfs: this.props.n,
                    zipName: this.props.n
                }
                this.props.downloadZip(data3)
                break

            case 3:
                if (this.state.fileName) {
                    this.setState({
                        fileName: false
                    })
                }
                const data = {
                    dir: this.props.dir,
                    cfs: this.props.checkedFiles,
                    zipName: this.state.name
                }
                this.props.shareDownloadLink(data, (done) => {
                    if (done) console.log(this.props.download_link);
                    else console.log("error share link ");
                })

                // axios.post('http://localhost:5000/shr/link', data).then(res => {
                //     if (res.status === 200) {
                //         console.log("Success");
                //     }
                //     else if (res.status === 500) {
                //         console.log("error ", res);
                //     }
                // }).catch(err => {
                //     console.log("error ", err);
                // });
                break

            case 4:
                if (this.state.fileName) this.setState({ fileName: false })
                break

            case 5:
                break

            default:
        }
        if (this.state.anchorEl) this.setState({ anchorEl: null })
    }

    handleChange = (event) => {
        this.setState({
            name: event.target.value,
        });
    };


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
                            <FaShareAlt />
                        </ListItemIcon>
                        <ListItemText classes={{ primary: this.state.classes.primary }} inset primary="Zip and share download link" />
                    </MenuItem>

                    <Dialog
                        open={this.state.fileName}
                        onClose={(e) => this.menuActions(4)}
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
                                margin="normal" />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={(e) => this.menuActions(3)} color="primary" autoFocus>
                                Okay
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <MenuItem className={this.state.classes.menuItem} onClick={() => this.menuActions(2)}>
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

export default connect(mapStateToProps, actions)(withStyles(styles)(MenuMultiFileIcon));