import React, {Component} from 'react';
import Nav from './components/Nav';
import Login from './components/Login';
import List from './components/List';
import Edit from './components/Edit';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

class App extends Component {
  constructor() {
    super();
    this.state = {}
  }


  render() {
    return (
      <Router>
        <div className="App">
          <Nav />
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/list" component={List} />
            <Route path="/edit" exact component={Edit} />
            <Route path="/edit/:id" component={Edit} />
            <Route path="/*" exact component={Login} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
