import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import User from './User';
import CreateBaby from './CreateBaby';
import EditBaby from './EditBaby';
import CreatePost from './CreatePost';
import CreateTask from './CreateTask';


function App() {
  return (
    <main className="App">
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/auth/login" component={ Login } />
        <Route exact path="/auth/register" component={ Register }/>
        <Route exact path="/user" component={ User }/>
        <Route exact path="/baby/new" component={ CreateBaby }/>
        <Route exact path="/baby/edit" component={ EditBaby }/>
        <Route exact path="/post/new" component={ CreatePost }/>
        <Route exact path="/task/new" component={ CreateTask }/>
      </Switch>
    </main>
  );
}

export default App;
