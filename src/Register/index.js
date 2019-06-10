import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Register extends Component {
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
			const registerResponse = await fetch(process.env.REACT_APP_BACKEND_URL + '/auth/register', {
		      method: 'POST',
		      credentials: 'include', 
		      body: JSON.stringify(this.state),
		      headers:{
		        'Content-Type': 'application/json'
		    		}
		    	})

        	const parsedResponse = await registerResponse.json();
        	if(parsedResponse.status === 200){
        		this.props.appLogin();
	    		this.props.history.push('/user');
	    		console.log('Status: ', parsedResponse.status);
	    	}
	    }   
		 catch (err){
			console.error(err)
			}
	
	}
	render(){
		return (
			<div>
				<form className="auth" onSubmit={this.handleSubmit}>
					<input type="text" name="username" placeholder="username" onChange={this.handleChange}/>
					<input type="password" name="password" placeholder="password" onChange={this.handleChange}/>
					<button type="submit">Register</button><br/>
				</form>
			</div>
			)
	}
}

export default Register;