import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import User from './User';
import RandomName from './RandomName'


function App() {
  return (
    <main className="App">
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/auth/login" component={ Login } />
        <Route exact path="/auth/register" component={ Register }/>
        <Route exact path="/user" component={ User }/>
        <Route exact path="/name/random" component={ RandomName }/>
      </Switch>
    </main>
  );
}

export default App;
