import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './App.css';
import MainBody from './body/MainBody';

const THEME = createMuiTheme({
  typography: {
   "fontFamily": "\"Comfortaa\", \"Helvetica\", \"Arial\", sans-serif",
   "fontSize": 14,
   "fontWeightLight": 300,
   "fontWeightRegular": 400,
   "fontWeightMedium": 500
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={THEME}>
        <div>
          <MainBody/>
        </div>
      </MuiThemeProvider >
    );
  }
}

export default App;
