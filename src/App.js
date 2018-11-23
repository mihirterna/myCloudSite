import React, { Component } from 'react';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import MainBody from './body/MainBody';
import reducers from './reducers';
import './App.css';

const THEME = createMuiTheme({
  typography: {
    useNextVariants: true,
   "fontFamily": "\"Calibri\", \"Helvetica\", \"Arial\", sans-serif",
   "fontSize": 14,
   "fontWeightLight": 300,
   "fontWeightRegular": 400,
   "fontWeightMedium": 500
  }
});

class App extends Component {
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <MuiThemeProvider theme={THEME}>
        <Provider store={store}>
          <div>
            <MainBody/>
          </div>
        </Provider>
      </MuiThemeProvider >
    );
  }
}

export default App;
