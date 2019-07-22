import React, { Component } from 'react';
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
import ErrorPage from './ErrorPage';

class App extends Component {
  constructor(props){
    super()
    this.state = {
      loggedIn: false,
      userData: null
    }
  }
  appLogin = (userData) => {
    this.setState({
      userData: userData,
      loggedIn: true
    })
  }
  appLogout = () => {
    this.setState({
      userData: null,
      loggedIn: false
    })
  }
  render(){
    return (
      <main className="App">
        <Switch>
          <Route exact path="/auth/login" render={ (props) => <Login {...props} loggedIn={this.state.loggedIn} appLogin={this.appLogin} />} />
          <Route exact path="/auth/register" render={ (props) => <Register {...props} loggedIn={this.state.loggedIn} appLogin={this.appLogin} />} />
          <Route exact path="/user" render={ (props) => <User {...props} loggedIn={this.state.loggedIn} appLogin={this.appLogin} appLogout={this.appLogout} />} />
          <Route exact path="/baby/new" component={ CreateBaby }/>
          <Route exact path="/baby/edit" component={ EditBaby }/>
          <Route exact path="/post/new" component={ CreatePost }/>
          <Route exact path="/task/new" component={ CreateTask }/>
          <Route exact path="/error" component={ ErrorPage }/>
          <Route exact path="/" render={ (props) => <Home {...props} loggedIn={this.state.loggedIn} appLogin={this.appLogin} />} />
        </Switch>
      </main>
    );
  }
}

export default App;
