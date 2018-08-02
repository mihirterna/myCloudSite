import React, { Component } from 'react';
import { Typography, CardContent, Button, Card, Checkbox   } from '@material-ui/core';
import * as actions from '../actions';
import { connect } from 'react-redux';
import './card.css'
import * as FontAwesome from 'react-icons/lib/fa';

const mapStateToProps = state => {
    return {
        files: state.auth.files,
        dir: state.auth.dir,
        head: state.auth.head,
        err: state.auth.err,
        cb_val : state.auth.cb_val
    };
  };
  
  class MenuIcon extends Component {

    showDropdown() {
        document.getElementById("myDropdown").classList.toggle("show");
    }

    

    render(){
     

        return(
            <div>
                <div className="dropdown">
                    <ul className="dropbtn icons btn-right showLeft" onClick={this.showDropdown.bind(this)}>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                    <div id="myDropdown" className="dropdown-content">
                        <a href="#home">Home</a>
                        <a href="#about">About</a>
                        <a href="#contact">Contact</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, actions)(MenuIcon);