import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './Login'
import Register from './Register'

function App() {
  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;
