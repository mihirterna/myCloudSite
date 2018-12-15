import React, { Component } from 'react';
import { createMuiTheme, withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import FileMap from './FileMap';
import LoginForm from './LoginForm';
import * as actions from '../actions';
import '../CSS/mainBody.css';

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

class MainBody extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showPassword: false
        }
    }

    componentDidMount() {
        this.props.headChanged("getList");
    }

    render() {
        const replyText =
            <div>
                <h3>DeviceID: {this.props.uid}</h3>
                <h3>UserName: {this.props.uname}</h3>
                <FileMap />
            </div>
        return (this.props.isLogin) ? replyText : <LoginForm />;
    }
}

const mapStateToProps = state => {
    return {
        isLogin: state.auth.isLogin
    };
};

export default connect(mapStateToProps, actions)(withStyles(theme)(MainBody));
