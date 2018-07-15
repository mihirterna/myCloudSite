import React, { Component } from 'react';
import './App.css';
import Header from  './header/header';
import MainBody from './body/MainBody';
import MediaControlCard from './body/card';

class App extends Component {
  render() {
    return (
    <div>
      <Header/>
      <MainBody/>
        </div>
      );
  }
}

export default App;
