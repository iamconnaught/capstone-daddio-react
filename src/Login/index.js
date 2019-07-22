import React, { Component } from 'react';

// Log in existing User
class Login extends Component {
	constructor(){
		super();
		this.state = {
			username: '',
			password: ''
		}
	}
	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
	}
	handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const loginResponse = await fetch(process.env.REACT_APP_BACKEND_URL + '/auth/login', {
				method: 'Post',
				credentials: 'include',
				body: JSON.stringify(this.state),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			console.log('logged in as ', this.state.username);
			console.log('loginResponse');
			console.log(loginResponse);
			const parsedResponse = await loginResponse.json();
			console.log('parsedResponse');
			console.log(parsedResponse);
			this.props.appLogin();
			this.props.history.push('/user')
		} catch (err){
			console.log(err);
		}
	}
	render(){
		return(
			<div>
				<form className="auth" onSubmit={this.handleSubmit}>
					<input type="text" name="username" placeholder="username" onChange={this.handleChange}/>
					<input type="password" name="password" placeholder="password" onChange={this.handleChange}/>
					<button type="submit">Login</button><br/>
				</form>
			</div>
			)
	}

}

export default Login;