import React, { Component } from 'react';
import { Home } from "../Home/Home";
import { About } from "../About/About";
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <div className="App">
        <nav>
          <Link to="/" target="_self"><h4 className="heading omnus">Omnus</h4></Link>
          <Link to="/about"><h4 className="heading about">About</h4></Link>
        </nav>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
      </Switch>
    </div>
    );
  }
}
export default App