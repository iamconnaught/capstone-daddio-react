import React, { Component } from 'react';

class EditTask extends Component {
	constructor(props){
		super(props);
		this.state = {
			title: '',
			details: ''
		}
	}
	componentDidMount(){
		this.getFormData();
	}
	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value});

	}
	handleSubmit = async (e) => {
		e.preventDefault();
		try {

			console.log("Task Id")
			console.log(this.props.idOfTaskBeingEdited);

			await fetch(process.env.REACT_APP_BACKEND_URL + '/task/' + this.props.idOfTaskBeingEdited, {
				method: "PUT",
				credentials: 'include',
				body: JSON.stringify(this.state),
				headers:  {
		        	'Content-Type': 'application/json'
		    	}
			})
			// console.log('updatedBaby');
			// console.log(updatedBaby);
			// const parsedResponse = await updatedTask.json();
			// console.log(parsedResponse);
			// if(parsedResponse.status === 200){
	  //   		this.props.history.push('../user/profile');
	  //   	}

	  		this.props.closeEdit();

		} catch (err){
			console.error(err)
		}
	}
	getFormData = async () => {
		console.log("getform data hit, showing id: ");
		console.log(this.props.idOfTaskBeingEdited);
		try {
			const getTask = await fetch(`${process.env.REACT_APP_BACKEND_URL}/task/${this.props.idOfTaskBeingEdited}`, {
				method: 'GET',
				credentials: "include"
			})
			const fetchedData = await getTask.json();
			console.log('fetchedData');
			console.log(fetchedData);
			this.setState({
				title: fetchedData.title,
				details: fetchedData.details,
				keywords: fetchedData.keywords
			})
		} catch (err){
			console.error(err)
		}
	}
	render(){
		
		console.log("here is state for edit post:");
		console.log(this.state)

		return(


			<div>
				<h1>EDIT Task</h1>
				<form onSubmit={this.handleSubmit}>
					<input 
						type="text" 
						name="title" 
						value={this.state.title} 
						onChange={this.handleChange}
					/>
					<textarea 
						type="text" 
						name="details" 
						value={this.state.details} 
						onChange={this.handleChange}
					/>
					<button type="submit"> Update Task </button>
				</form>
			</div>

		)
	}

}

export default EditTask;