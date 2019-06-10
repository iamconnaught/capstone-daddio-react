import React, { Component } from 'react';
import Register from '../Register';
import Login from '../Login';
import User from '../User';

class Home extends Component{
	constructor(){
		super();
		this.state = {
			loginShowing: false,
			registerShowing: false,
			loggedIn: false
		}
	}
	loginOpen = () => {
		this.setState({
			loginShowing: true,
			registerShowing: false
		})
	}
	registerOpen = () => {
		this.setState({
			loginShowing: false,
			registerShowing: true
		})
	}
	render(){
		return(
			<div className="home">
				<div id="homeTop">
					<h1 className="daddio">DADDIO</h1>
				</div>
				<div className="homeBottom">
					{this.state.loginShowing ? <Login appLogin={this.props.appLogin} history={this.props.history} /> : <span onClick={this.loginOpen}> Login </span>}
					{this.state.registerShowing ? <Register appLogin={this.props.appLogin} history={this.props.history} /> : <span onClick={this.registerOpen} > Register </span> }
				</div>
			</div>
		)
	}
}

export default Home;