import React, { Component } from 'react';
import Router from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Header from './Header';
import Home from './Home';
import Saved from './Saved';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header/>
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route exact path='/saved' component={Saved}/>          
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
