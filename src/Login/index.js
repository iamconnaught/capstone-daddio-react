import React, { Component } from 'react';
import { Link }from 'react-router-dom';

class Login extends Component {
	constructor(){
		super();
		this.state = {
			username: '',
			password: ''
		}
	}
	
	render(){
		return(
			<div>
				<form onSubmit={this.handleSubmit}>
					<input type="text" name="username" placeholder="username" onChange={this.handleChange}/>
					<input type="password" name="password" placeholder="password" onChange={this.handleChange}/>
					<button type="submit">Login</button>
				</form>
			</div>
			)
	}

}

export default Login;