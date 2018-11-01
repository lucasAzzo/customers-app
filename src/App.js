import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import HomeContainer from './containers/HomeContainer';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={HomeContainer}></Route>
          <Route exact path="/customers"></Route>
          <Switch>
            <Route path="/customers/new"></Route>
            <Route path="/customers/:dni"></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
