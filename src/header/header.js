import React, { Component } from 'react';
import './header.css';
//import Button from '@material-ui/core/Button';
//import TextField from '@material-ui/core/TextField';
//import axios from 'axios';

export default class header extends Component{
    constructor(){
        super();   
    }
      render(){
          return(
            <div className="navbar transparent navbar-inverse">
            <div className="navbar-inner">
            <div className="container">
                        <button type="button" className="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="brand" href="#">lol</a>
                        <div className="nav-collapse collapse">
                            <ul className="nav pull-right">
                                <li className="active"><a href="/">Home</a></li>
                                <li><a href="about">About</a></li>
                            </ul>
                        </div>
                    </div>
              </div>
              </div>
          );
      }
}