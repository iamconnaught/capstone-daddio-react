import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
			if (parsedResponse.status === 200) {
				//this.props.history.push('/user');//url not set up yet
			}	console.log('status:', parsedResponse.status);
			
		} catch (err){
			console.log(err);
		}
	}
	render(){
		return(
			<div>
				<form onSubmit={this.handleSubmit}>
					<input type="text" name="username" placeholder="username" onChange={this.handleChange}/>
					<input type="password" name="password" placeholder="password" onChange={this.handleChange}/>
					<button type="submit">Login</button><br/>
					<span>Need to <Link to='/auth/register'>Register?</Link></span>
				</form>
			</div>
			)
	}

}

export default Login;