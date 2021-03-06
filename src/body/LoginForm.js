import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Button, InputAdornment, IconButton, TextField } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import * as actions from '../actions';
import * as STRINGS from './strings';

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    overrides: {
        MuiButton: {
            root: {
                background: 'linear-gradient(45deg, #0f0c29, #302b63, #24243e)',
                borderRadius: 3,
                border: 0,
                color: 'white',
                height: 48,
                padding: '0 30px',
                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            },
        },
    },
});

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPassword: false
        }
    }

    handleMouseDownPassword = event => {
        event.preventDefault();
    };

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    componentDidUpdate() {
        if (this.props.err) console.log(this.props.err);
    }

    onIdChanged(e) {
        this.props.idChanged(e.target.value);
    }

    onUnameChanged(e) {
        this.props.unameChanged(e.target.value);
    }

    onPasswordChanged(e) {
        this.props.passwordChanged(e.target.value);
    }

    alertError() {
        if (this.props.err) console.log(this.props.err);
    }

    onLoginClicked() {
        const data = {
            head: this.props.head,
            devID: this.props.uid,
            uname: this.props.uname,
            pswd: this.props.password,
            dir: STRINGS.ROOT
        }
        this.props.loginUser(data);
    }

    render() {
        return (
            <div className="wrapper">
                <h2>Login</h2>
                {this.alertError()}
                <form className="samForm">
                    <TextField
                        id="devID"
                        label="Device ID"
                        autoComplete="on"
                        className="devID"
                        value={this.props.uid}
                        onChange={this.onIdChanged.bind(this)}
                        margin="normal" />
                    <TextField
                        required
                        id="uname"
                        label="User Name"
                        className="uname"
                        autoComplete="on"
                        value={this.props.uname}
                        onChange={this.onUnameChanged.bind(this)}
                        margin="normal" />
                    <TextField
                        type={this.state.showPassword ? 'text' : 'password'}
                        id="pswd"
                        label="Password"
                        autoComplete="on"
                        className="pswd"
                        value={this.props.password}
                        onChange={this.onPasswordChanged.bind(this)}
                        margin="normal"
                        InputProps={{
                            endAdornment:
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="Toggle password visibility" >
                                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                        }} />
                    <MuiThemeProvider theme={theme}>
                        <Button
                            style={{ marginTop: 20 }}
                            variant="contained"
                            color="primary"
                            onClick={this.onLoginClicked.bind(this)}>
                            Login
                        </Button>
                    </MuiThemeProvider >
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        uid: state.auth.uid,
        uname: state.auth.uname,
        password: state.auth.password,
        isLogin: state.auth.isLogin,
        err: state.auth.err,
        head: state.file.head,
    };
};

export default connect(mapStateToProps, actions)(withStyles(theme)(LoginForm));
