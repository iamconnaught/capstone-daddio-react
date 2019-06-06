import React, { Component } from 'react';
import Header from '../Header';

class CreateTask extends Component {
	constructor(){
		super();
		this.state = {
			title: '',
			details: '',
			isCompleted: false
		}
	}
	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value});

	}
	handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const taskResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/task/new`, {
				method: "POST",
				credentials: 'include',
				body: JSON.stringify(this.state),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			const parsedResponse = await taskResponse.json();
			console.log('create task parsedResponse');
			console.log(parsedResponse);
		} catch (err){
			console.error(err)
		}
	}
	render(){
		return(
			<div>
				<Header />
				<form onSubmit={this.handleSubmit}>
					<input type="text" name="title" placeholder="Title" onChange={this.handleChange}/>
					<input type="text" name="details" placeholder="Details" onChange={this.handleChange}/>
					<button type="submit">Add Task</button>
				</form>
			</div>
			)
	}
}

export default CreateTask;